import { useEffect, useState } from 'react';
import axios from 'axios';

const LongPolling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const subscribe = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/get-messages');
        setMessages((prev) => [data, ...prev]);
        await subscribe();
      } catch (error) {
        setTimeout(async () => {
          await subscribe();
        }, 1000);
      }
    };

    subscribe();
  }, []);

  const sendMessage = async () => {
    await axios.post('http://localhost:5000/new-messages', {
      message: value,
      id: Date.now(),
    });
  };

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
              <div className="message" key={mess.id}>
                {mess.message}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LongPolling;
