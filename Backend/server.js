import { createServer } from 'node:http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

const ROOM = 'group'

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('joinRoom', async (userName) => {
        console.log(`${userName} joined the room`);
        await socket.join(ROOM);
        // io.to(ROOM).emit('roomNotice', userName);
        socket.to(ROOM).emit('roomNotice', userName);
    })

    socket.on('chatMessage', (msg) => {
        // console.log(msg);
        socket.to(ROOM).emit('chatMessage', msg);
    })
    socket.on('typing', (userName) => {
        // console.log(msg);
        socket.to(ROOM).emit('typing', userName);
    })
    socket.on('stopTyping', (userName) => {
        // console.log(msg);
        socket.to(ROOM).emit('stopTyping', userName);
    })
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(3000, () => {
    console.log('Server listening on port:3000');
});
