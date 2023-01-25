import React from "react";
import { useEffect } from "react";
import SockJS from "sockjs-client";
// import Stomp from "stompjs";
import { instance } from "../../api/axiosApi";

function ChatDetail() {
  const sock = new SockJS("/ws/chat");
  // const ws = Stomp.over(sock);
  // const reconnect = 0;

  const roomId = localStorage.getItem('wschat.roomId');
  const sender = localStorage.getItem('wschat.sender');

  const findRoom = () =>{
    try{
      const data = instance.get('/chat/room/'+ roomId);
      console.log(data)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    findRoom();
  },[])


  return(
    <div>
      Chat Detail
    </div>
  )
}

export default ChatDetail;