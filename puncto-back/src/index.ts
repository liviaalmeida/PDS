import { createConnection } from 'typeorm';

import cors from 'cors';
import userRouter from './api/user';
import clienteRouter from './api/cliente';
import pontoRouter from './api/ponto';
import { connectionOptions } from './config';

const express = require('express');

// meio gambiarra isso, mas não achei outra forma facil
// de permitir injetar outros valores na request
declare global {
  namespace Express {
    interface Request {
      userEmail: string
    }
  }
}

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(userRouter);

//@TODO alterar o endpoint de /company para /cliente
app.use('/company', clienteRouter);

app.use('/ponto', pontoRouter)

app.listen(port, async () => {
  await createConnection(connectionOptions);
  console.log(`Example app listening at http://localhost:${port}`);
});
