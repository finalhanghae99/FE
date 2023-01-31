import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { instance } from "../../api/axiosApi";

const baseUrl = process.env.REACT_APP_SERVER;

function ChatDetail() {
  const sock = new SockJS(`${baseUrl}/ws/chat`);
  const ws = Stomp.over(sock);
  const reconnect = 0;

  const roomId = localStorage.getItem('wschat.roomId');
  const sender = localStorage.getItem('wschat.sender');

  const [roomInfo, setRoomInfo] = useState();
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const findRoom = () => {
    instance.get('/chat/room/' + roomId).then(response => { setRoomInfo(response.data); });
  }
  const sendMsg = () => {
    if(msg.trim() === "") return null;
    ws.send("/app/chat/message", {}, JSON.stringify({ type: 'TALK', roomId: roomId, sender: sender, message: msg }));
    setMsg("")
  }
  // const recvMsg = async(recv) => {
  //   console.log(messages)
  //   // const newMsg = [...messages , { "type": recv.type, "sender": recv.type == 'ENTER' ? '[알림]' : recv.sender, "message": recv.message }]
  //   await messages.unshift(recv)
  //   setMessages(messages);
  // }

  // sendMessage: function() {
  //   ws.send("/app/chat/message", {}, JSON.stringify({type:'TALK', roomId:this.roomId, sender:this.sender, message:this.message}));
  //   this.message = '';
  // },
  // recvMessage: function(recv) {
  //     this.messages.unshift({"type":recv.type,"sender":recv.type=='ENTER'?'[알림]':recv.sender,"message":recv.message})
  // }

  console.log(messages)
  const connect = () => {
    // pub/sub event
    ws.connect({}, function (frame) {
      ws.subscribe("/topic/chat/room/" + roomId, function (message) {
        const recv = JSON.parse(message.body);
        console.log("recover",recv, messages);
        messages.unshift(recv)
        // setMessages([recv, ...messages])
        setMessages(messages)
        // recvMsg(recv);
      });
      ws.send("/app/chat/message", {}, JSON.stringify({ type: 'ENTER', roomId: roomId, sender: sender }));
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

  useEffect(() => {
    findRoom();
    connect();
  }, [])
  useEffect(()=>{
    setMessages(messages)
  },[messages])


  return (
    <div>
      <h1>{roomInfo?.roomName}</h1>
      Chat Detail
      <div>
        <input
          value={msg}
          onChange={(event) => { setMsg(event.target.value) }}
        />
        <button onClick={sendMsg}>전송</button>
      </div>
      {(messages !== []) && (
        messages?.map((v,i) => {
          return (
            <div key={i}>
              <div>User: {v.sender}</div>
              <div>Comments: {v.message}</div>
              <br />
            </div>
          )
        })
      )
      }
    </div>
  )
}

export default ChatDetail;