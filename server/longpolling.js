const express = require('express');
const cors = require('cors');
const events = require('events');

const PORT = 5000;

const emmitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/get-messages', (req, res) => {
  emmitter.once('newMessage', (message) => {
    res.json(message);
    res.end();
  });
});

app.post('/new-messages', (req, res) => {
  const message = req.body;
  emmitter.emit('newMessage', message);
  res.status(200);
  res.end();
});

app.listen(PORT, () => {
  console.log('Server is up and running on ', PORT);
});
