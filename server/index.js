const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 5000;

const router = require('./Router');

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('New connection');
    socket.on('disconnect', () => {
        console.log('A user has left');

    });
});

app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`);
});




