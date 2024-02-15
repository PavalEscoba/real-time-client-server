import React from 'react';
// import LongPolling from './LongPolling';
import EventSourcing from './EventSourcing';
import Websockets from './Websockets';
import './app.css';

function App() {
  return (
    <div>
      {/* <LongPolling /> */}
      {/* <EventSourcing /> */}
      <Websockets />
    </div>
  );
}

export default App;
