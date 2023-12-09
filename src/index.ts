import express, { Request, Response } from 'express';
const ffi = require('ffi-napi');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send(dateTimeDLL.getCurrentDateTime());
});

  const dateTimeDLL = ffi.Library('C:/Users/Eduardo/Desktop/POC/DLL/dataHoraAtual.dll', {
    'getCurrentDateTime': ['string', []],
  });

app.listen(PORT, () => {
//  const dateTime: string = dateTimeDLL.getCurrentDateTime();
  console.log(`Server running at http://localhost:${PORT}/`);
});