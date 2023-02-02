import React from "react";
import { useState, useRef, useCallback, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { instance, baseUrl } from "../../api/axiosApi";
import { getCookies } from "../../api/cookieControler";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, __getPrevMsg } from "../../redux/modules/chattingSlice";
import moment from 'moment';
import 'moment/locale/ko';


import styled from "styled-components";

import { ReactComponent as arrowUp } from "../../img/icons/arrowUp.svg"

function ChatBody({ nickname }) {
  const { messages } = useSelector((state) => state.chatting);
  const dispatch = useDispatch();
  let sock = new SockJS(`${baseUrl}/ws/chat`);
  let ws = Stomp.over(sock);
  let reconnect = 0;
  const token = getCookies("id");
  let headers = { token: token };
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

  const { id } = useParams();
  const sender = nickname;

  const scrollBottomRef = useRef(null);

  const [roomInfo, setRoomInfo] = useState();
  const [msg, setMsg] = useState("");
  // const [messages, setMessages] = useState([]);
  // console.log(messages)
  const textRef = useRef();
  const handleResize = useCallback(() => {
    textRef.current.style.height = "auto"
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  const dateCalc = (postDate) => {
    const current = moment();
    let date = moment(postDate);
    const diff = current - date
    if (diff < 86400000) {
      date = date.format("a hh:mm")
    } else {
      date = date.format("MM.DD")
    }
    return date;
  }

  const findRoom = () => {
    instance.get('/chat/room/' + id).then(response => { setRoomInfo(response.data); });
  }
  const sendMsg = () => {
    let curr = new Date();
    // console.log(curr)
    // const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
    // console.log(utc)
    // const kr_curr = new Date(utc + (KR_TIME_DIFF));
    // curr = new Date(JSON.parse(curr))
    ws.send("/app/chat/message/" + id, headers, JSON.stringify(
      { type: 'TALK', roomId: id, sender: sender, message: msg, sendDate : curr}));
    setMsg("")
  }
  // const recvMsg = (recv) => {
  //   console.log(messages)
  //   const newMsg = [...messages , { "type": recv.type, "sender": recv.type == 'ENTER' ? '[알림]' : recv.sender, "message": recv.message }]
  //   setMessages(newMsg);
  // }

  const connect = () => {
    // pub/sub event
    ws.connect(headers, function (frame) {
      ws.subscribe("/topic/chat/room/" + id, function (message) {
        const recv = JSON.parse(message.body);
        // setMessages([recv, ...messages])
        // messages.unshift(recv)
        // setMessages(messages)
        dispatch(setMessages(recv))
        // recvMsg(recv);
      });
      ws.send("/app/chat/message", headers, JSON.stringify({ type: 'ENTER', roomId: id, sender: sender }));
    }, function (error) {
      if (reconnect++ <= 5) {
        console.log(error)
        setTimeout(function () {
          console.log("connection reconnect");
          sock = new SockJS(`${baseUrl}/ws/chat`);
          ws = Stomp.over(sock);
          connect();
        }, 10 * 1000);
      }
    });
  }
  const close = () =>{
    ws.disconnect();
  }
  useEffect(() => {
    findRoom();
    connect();
    dispatch(__getPrevMsg(id))
    return close
  }, [])

  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView();
  });

  return (
    <ChatWindow>
        <InputFrame>
          <MsgInput
            ref={textRef}
            value={msg}
            onChange={(event) => {
              setMsg(event.target.value)
              // handleResize()
            }}
          />
          <SendBtn onClick={sendMsg}><ArrowIcon /></SendBtn>
        </InputFrame>
      {(messages !== []) && (
        messages?.map((v, i) => {
          if (v.sender === sender) {
            return (
              <SenderChat key={i}>
                {/* <div>User: {v.sender}</div> */}
                <OrangeMsg>{v.message}</OrangeMsg>
                {/* <ChatDate>{dateCalc(v.sendDate)}</ChatDate> */}
                <br />
              </SenderChat>
            )
          } else {
            return (
              <div key={i}>
                {/* <div>User: {v.sender}</div> */}
                <GrayMsg>{v.message}</GrayMsg>
                {/* <ChatDate>{dateCalc(v.sendDate)}</ChatDate> */}
                <br />
              </div>
            )
          }
        })
      )
      }
      {(messages !== []) && (<div ref={scrollBottomRef}></div>)}
    </ChatWindow>
  )
}
export default ChatBody;

const InputFrame = styled.div`
  background-color: white;
  display: flex;
  position: fixed;
  bottom: 64px;
  left : 0;
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  gap: 6px;
  @media (min-width: 414px) {
    width : 414px;
    /* top: 50%; */
    left: 50%;
    transform: translate(-50%, 0%);
  }
`
const MsgInput = styled.textarea`
  border-radius: 26px;
  /* height: 40px; */
  border-color: var(--Gray1);
  width: 100%;
  /* padding: 6px; */
  resize: none;
  min-height: 40px;
  max-height: 100px;
  padding: 12px;
  box-sizing: border-box;
  height: 14px;
  line-height: 16px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &:-webkit-scrollbar{
    display: none;
  }
`

const SendBtn = styled.button`
  border-radius:100%;
  border: none;
  height: 40px;
  min-width: 40px;
  max-width: 40px;
  background-color: var(--Brand6);
  line-height: 14px;
`

const ArrowIcon = styled(arrowUp)`
  height: 14px;
`

const OrangeMsg = styled.div`
  display: inline-block;
  background-color: var(--Brand6);
  border-radius: 18px;
  padding: 6px 12px;
  color: white;
  margin-bottom:8px ;
  white-space: pre-wrap;

  /* align-items: flex-start; */
`
const GrayMsg = styled.div`
  display: inline-block;
  background-color: var(--Gray2);
  border-radius: 18px;
  padding: 6px 12px;
  margin-bottom:8px ;
  white-space: pre-wrap;
  /* color: white; */
  /* align-items: flex-end; */
`
const SenderChat = styled.div`
  /* display: inline; */
  text-align: right;
`


const ChatWindow = styled.div`
  padding: 162px 24px 88px 24px;
`

const ChatDate = styled.div`
  font-size: 12px;
  color: var(--Gray3);
`