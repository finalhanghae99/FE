import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../api/axiosApi";

function ChatPage() {
  const [rooms, setRooms] = useState()
  const [roomName, setRoomName] = useState("")
  const navigate = useNavigate();
  const fetchRoom = async () => {
    try {
      const data = await instance.get('/chat/rooms')
      console.log(data)
      setRooms(data.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRoom();
  }, []);
  console.log(rooms)

  const createRoom = () => {
    const params = new URLSearchParams();
    params.append("name", roomName);
    if ("" === roomName) {
      alert("방 제목을 입력해 주십시요.");
      return;
    } else {
      try {
        console.log(roomName)
        const data = instance.post('/chat/room', params)
        console.log(data)
      } catch (error){
        console.log(error)
        alert("채팅방 개설에 실패하였습니다.");
      }
    }
  }
  const enterRoom = (roomId) => {
    const sender = prompt('이름을 입력해 주세요.');
    if (sender !== "") {
      localStorage.setItem('wschat.sender', sender);
      localStorage.setItem('wschat.roomId', roomId);
      navigate(`/chat/room/${roomId}`)
    }
  }

    return (
      <div>
        Chat
        <input
          value={roomName}
          onChange={(event) => { setRoomName(event.target.value) }}
          placeholder="채팅차 이름" />
        <button onClick={createRoom}>생성</button>
        {rooms?.map((v) => {
          return (
            <div key={v.roomId}>
              <div onClick={() => {enterRoom(v.roomId)}}>{v.roomName} </div>
            </div>
          )
        })}
      </div>
    )
}
export default ChatPage;