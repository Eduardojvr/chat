import express, { Request, Response } from 'express';
import http from 'http';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { randomInt } from 'crypto';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});


const PORT = process.env.PORT || 3000;



io.on('connection', (socket: Socket) => {
    console.log('Usuário Conectado!');
  
    socket.on('message', (message: string) => {
      io.emit('message', `${message}`);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });


  

  app.get('/', (req, res) => {
    res.sendFile("Api no ar!");
  });


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});