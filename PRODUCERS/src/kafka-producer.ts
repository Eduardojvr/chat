import { Kafka, Producer, ProducerRecord } from 'kafkajs';
const ffi = require('ffi-napi');

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092'], // Adjust as needed
});

const dateTimeDLL = ffi.Library('C:/Users/Eduardo/Desktop/POC/DLL/dataHoraAtual.dll', {
  'getCurrentDateTime': ['string', []],
});

const producer = kafka.producer();

async function run() {
  await producer.connect();

  const jsonData = { key: 'unique_key', dataHora: dateTimeDLL.getCurrentDateTime() }; // Your JSON data here
  const producerRecord: ProducerRecord = {
    topic: 'meu-topico',
    messages: [{ key: jsonData.key, value: JSON.stringify(jsonData) }],
  };
  await producer.send(producerRecord);

  await producer.disconnect();



}


setInterval(async () => {
  run().catch(console.error);
}, 3000);

