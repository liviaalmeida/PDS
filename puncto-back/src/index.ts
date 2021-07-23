import app from './server';
import { createConnection } from 'typeorm';
const express = require('express');

import cors from 'cors';
import userRouter from './api/user';
import clienteRouter from './api/cliente';
import pontoRouter from './api/ponto';
import { connectionOptions } from './config';

const port = 3000;

app.use(cors());
app.use(express.json());

app.use(userRouter);

app.use('/cliente', clienteRouter);

app.use('/ponto', pontoRouter)

app.listen(port, async () => {
  console.log(`Running on ${process.env.NODE_ENV} environment`);

  await createConnection(connectionOptions);
  console.log(`Server listening at http://localhost:${port}`);
});
