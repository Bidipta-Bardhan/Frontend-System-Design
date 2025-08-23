import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
const app=express();
const server = createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT=5111;
// Middleware
app.use(bodyParser.json());

// Route to serve your HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('Connection established');
    socket.on('chat message', (msg) => {
        io.emit('chat message',msg);
    })
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    })
})
server.listen(PORT,()=>{
    console.log(`Server is listnening at ${PORT}`);
})