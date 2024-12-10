import  express from 'express';
import  http  from'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`); // Log the socket ID
  socket.on('disconnect', () => {
    console.log(`A user disconnected: ${socket.id}`);
  });
})

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
