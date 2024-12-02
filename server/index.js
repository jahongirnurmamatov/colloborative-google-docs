import  express from 'express';
import  http  from'http';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);;


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
