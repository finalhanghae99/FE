import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatBody from "../../components/chat/ChatBody";
import ChatHeader from "../../components/chat/ChatHeader";
import { instance } from "../../api/axiosApi";

function ChattingPage() {
  const [nickname, setNickname] = useState();

  const setName = async () =>{
    try{
      const {data} = await instance.get('/usernick');
      if(data.statusCode === 200 ) setNickname(data.data.nickname)
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    setName();
  },[])
  return(
    <div>
      <ChatHeader nickname={nickname}/>
      <ChatBody nickname={nickname}/>
    </div>
  )
}
export default ChattingPage;