const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve da frontend interface
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// When a user steps into da chat room
io.on('connection', (socket) => {
  console.log('A user connected to da chat');

  // Listen for messages from da users
  socket.on('chat message', (msg) => {
    // Blast da message out to everybody live
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user bounced');
  });
});

// Use da port Render gives us, or default to port 3000
const PORT = process.env.PORT || 3000;

// NEW FIX: '0.0.0.0' forces da engine to bind to Render's network properly so it doesn't crash
server.listen(PORT, '0.0.0.0', () => {
  console.log('Da server is running on port ' + PORT);
});