import React from "react";
import { useState, useRef, useCallback, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { instance, baseUrl } from "../../api/axiosApi";
import { getCookies, setCookies } from "../../api/cookieControler";
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
  ws.debug= null;
  let reconnect = 0;
  const token = getCookies("id");
  let headers = { token: token };
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

  const { id } = useParams();
  const sender = nickname;

  const scrollBottomRef = useRef(null);

  const [roomInfo, setRoomInfo] = useState();
  const [msg, setMsg] = useState("");
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
  const sendMsg = (event) => {
    event.preventDefault();
    if(msg.trim()==="") return null;
    let curr = new moment();
    curr = curr.format("YYYY-MM-DDTHH:mm:ss")
    ws.send("/app/chat/message/" + id, headers, JSON.stringify(
      { type: 'TALK', roomId: id, sender: sender, message: msg, sendDate : curr}));
    setMsg("")
  }

  const connect = () => {
    ws.connect(headers, function (frame) {
      ws.subscribe("/topic/chat/room/" + id, function (message) {
        const recv = JSON.parse(message.body);
        dispatch(setMessages(recv))
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
            }}
          />
          <SendBtn onClick={sendMsg}><ArrowIcon /></SendBtn>
        </InputFrame>
      {(messages !== []) && (
        messages?.map((v, i) => {
          console.log(v.sendDate)
          if (v.sender === sender) {
            return (
              <SenderChat key={i}>
                {/* <div>User: {v.sender}</div> */}
                <OrangeMsg>{v.message}</OrangeMsg>
                <ChatDate>{dateCalc(v.sendDate)}</ChatDate>
                <br />
              </SenderChat>
            )
          } else {
            return (
              <div key={i}>
                {/* <div>User: {v.sender}</div> */}
                <GrayMsg>{v.message}</GrayMsg>
                <ChatDate>{dateCalc(v.sendDate)}</ChatDate>
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

const InputFrame = styled.form`
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
    left: 50%;
    transform: translate(-50%, 0%);
  }
`
const MsgInput = styled.textarea`
  border-radius: 26px;
  border-color: var(--Gray1);
  width: 100%;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  padding: 12px;
  box-sizing: border-box;
  height: 14px;
  line-height: 16px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar{
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
  text-align: left;
`
const GrayMsg = styled.div`
  display: inline-block;
  background-color: var(--Gray2);
  border-radius: 18px;
  padding: 6px 12px;
  margin-bottom:8px ;
  white-space: pre-wrap;

`
const SenderChat = styled.div`
  text-align: right;
`


const ChatWindow = styled.div`
  padding: 162px 24px 88px 24px;
`

const ChatDate = styled.div`
  font-size: 12px;
  color: var(--Gray3);
`