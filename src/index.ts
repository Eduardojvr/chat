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



let dataHora : any;

async function run() {
    const kafka = new Kafka({
        clientId: 'my-consumer',
        brokers: ['localhost:9092'], 
    });

    const consumer = kafka.consumer({ groupId: 'my-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'meu-topico', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
            let processedMessage: any;
            if (message != null) {
                dataHora = message["value"]

                const meuBuffer: Buffer = Buffer.from(dataHora, 'utf-8');
                const timestamp : any = meuBuffer.toString();

                setInterval(() => {
                    io.emit('message', 'Mensagem do servidor: '+  JSON.parse(timestamp).dataHora)}, 3000);
                  
                console.log("mensagemFila ", JSON.parse(timestamp).dataHora);
            }
        },
    });
}

io.on('connection', (socket: Socket) => {
    console.log('A user connected');
  
    socket.on('message', (message: string) => {
      console.log(`Message from client: ${message}`);
      io.emit('message', `Server received: ${message}`);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  

  app.get('/', (req, res) => {
    res.sendFile("Api no ar!");
  });

  app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    run().catch(console.error);

});