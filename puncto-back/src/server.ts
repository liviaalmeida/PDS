const express = require('express');
import cors from 'cors';

import userRouter from './api/user';
import clienteRouter from './api/cliente';
import pontoRouter from './api/ponto';
import invoiceRouter from './api/invoice';

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

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.use('/cliente', clienteRouter);
app.use('/ponto', pontoRouter);
app.use('/invoice', invoiceRouter);

export default app;
