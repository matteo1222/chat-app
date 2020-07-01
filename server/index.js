const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./user.js');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

const router = require('./Router');

const server = http.createServer(app);
const io = socketio(server, {wsEngine: 'ws'});

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
    console.log('New connection');

    socket.on('join', ({name, room}, callback) => {
    
        const {error, user} = addUser({id: socket.id, name, room});

        if (error) return callback(error);

        socket.join(user.room);
        socket.emit('message', {user: 'admin', text: `Welcome ${user.name} to the ${user.room} room!`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`});

        callback();

    });

    socket.on('sendMessage', (message, callback) => {
        
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message});
        callback();

    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        
        if(user){
            io.to(user.room).emit('message', {user:'admin', text: `${user.name} has left.`})
        }

    });
});

server.listen(PORT, () => {
    console.log(`Server has started`);
});




