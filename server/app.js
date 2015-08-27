'use strict';

var express = require('express');
var socketio = require('socket.io');

var app = express();

app.use(express.static('client'));

// need to take listening server & pass it into socket.io
var server = app.listen(3000, function () {
  console.log('Server listening on port 3000');
});

var io = socketio(server);

io.on('connection', function (socket) {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', function () {
    console.log('Client disconnected:', socket.id);
  })

  socket.on('chatMessage', function (msg) {
    console.log('Chat Message received:', msg);

    // below: toOne, toOthers & toEveryone are arbitrary.

    // // to the socket we got it from
    // socket.emit('chatMessage', {toOne: msg});
    // // to everyone except that socket (all other connected sockets)
    // socket.broadcast.emit('chatMessage', {toOthers: msg});
    // to all connected sockets (everyone)
    io.emit('chatMessage', msg);
  })

});
