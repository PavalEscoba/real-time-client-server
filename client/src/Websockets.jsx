import { useRef, useState } from 'react';
import axios from 'axios';

export default function Websockets() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState('');

  function connect() {
    socket.current = new WebSocket('ws://localhost:5000');
    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: 'connection',
        userName,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
      console.log('Connection established');
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };

    socket.current.onclose = () => {
      console.log('Socket is closed');
    };

    socket.current.onerror = () => {
      console.log('Error occured');
    };
  }

  const sendMessage = async () => {
    const message = {
      userName,
      message: value,
      id: Date.now(),
      event: 'message',
    };
    socket.current.send(JSON.stringify(message));
    setValue('');
  };

  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <input
            type="text"
            value={userName}
            onChange={(evt) => {
              setUserName(evt.target.value);
            }}
            placeholder="Enter your name"
          />
          <button onClick={connect}>Enter</button>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div>
        <div className="form">
          <label htmlFor="message">Enter a message</label>
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type="text"
            name="message"
            id="message"
          />
          <button onClick={sendMessage}>Send a message</button>
        </div>
        <div className="messages">
          {messages.map((mess) => {
            return (
              <div key={mess.id}>
                {mess.event === 'connection' ? (
                  <p className="connection_message">
                    User name {mess.userName} has connected
                  </p>
                ) : (
                  <div className="message">
                    {mess.userName}: {mess.message}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
