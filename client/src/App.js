import React, { useState } from 'react';
import './App.css'
import socketIO from 'socket.io-client';
import Message from './Message';

const socket = socketIO.connect("http://localhost:3001");

function App() {
  const [username, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [show, setShow] = useState(false);



  const joinRoom = () => {
    if (username !== "" && room !== "") {
      //emitter01
      socket.emit("join_room", room)
      setShow(true)
    }
  }
  return (
    <div>
      {!show ? (
        <div className="box">
          <div>
            <span className="text-center">
              <img src='/chat.png' /> JUSTCHAT❗
            </span>
            <div className="input-container">
              <input
                type='text'
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
              <label>Name</label>
            </div>
            <div className="input-container">
              <input
                type='text'
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <label>Room</label>
            </div>
            <button className='btn' type='submit' onClick={joinRoom}>submit</button>
          </div>
        </div>
      ) : (
        <Message socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
