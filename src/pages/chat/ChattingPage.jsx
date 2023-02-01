import React from "react";
import { useParams } from "react-router-dom";
import ChatBody from "../../components/chat/ChatBody";
import ChatHeader from "../../components/chat/ChatHeader";

function ChattingPage() {
  return(
    <div>
      <ChatHeader />
      Chatting

      <ChatBody />
    </div>
  )
}
export default ChattingPage;