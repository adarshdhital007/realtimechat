import React, { useState, useEffect } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import "../src/styles/App.css";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");

  const handleEnterChat = () => {
    setIsInChat(true);
  };
  
  const handleSignOut = () => {
    setIsAuth(null);
    cookies.remove("auth-token");
  };

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room">
          <label> Type room name </label>
          <input onChange={(e) => setRoom(e.target.value)} />
          <button onClick={handleEnterChat}>Enter Chat</button>
        </div>
      ) : (
        <div className="chat-room">
          <Chat room={room} />
        </div>
      )}
    </AppWrapper>
  );
}

export default App;
