import { createConnection } from 'typeorm';

import userRouter from './api/user';
import companyRouter from './api/company';
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

app.use(express.json());

app.use(userRouter);

app.use('/company', companyRouter);

app.listen(port, async () => {
  await createConnection(connectionOptions);
  console.log(`Example app listening at http://localhost:${port}`);
});
