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

export default app;
