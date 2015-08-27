'use strict';

var express = require('express');
var socketio = require('socket.io');

var app = express();

app.use(express.static('client'));

// need to take listening server & pass it into socket.io
var server = app.listen(3000, function () {
  console.log('Server listening on port 3000');
});

socketio(server);
