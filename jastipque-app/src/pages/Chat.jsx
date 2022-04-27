import "../App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import ChatRoom from "../components/ChatRoom";

const socket = io.connect("https://app-server-jastip.herokuapp.com");

export default function Chat() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [room, setRoom] = useState(localStorage.getItem("username") + "_admin");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  useEffect(() => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  });

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder={room}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <ChatRoom socket={socket} username={username} room={room} />
      )}
    </div>
  );
}
