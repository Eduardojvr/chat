import express, { Request, Response } from 'express';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';

const app = express();
const PORT = process.env.PORT || 3000;

async function run() {
    const kafka = new Kafka({
        clientId: 'my-consumer',
        brokers: ['localhost:9092'], // Adapte conforme necessário
    });

    const consumer = kafka.consumer({ groupId: 'my-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'meu-topico', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
            let processedMessage: any;
            if (message != null) {
                console.log("mensagemFila ", { message });
            }
        },
    });
}

app.get('/', (req: Request, res: Response) => {
    res.send("API NO AR!");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    run().catch(console.error);

});