import { createConnection } from 'typeorm';

import app from './server';
import config from './config';
import { connectionOptions } from './config';

const port = config.port;

createConnection(connectionOptions);

app.listen(port, async () => {
  console.log(`Running on ${process.env.NODE_ENV} environment`);

  console.log(`Server listening at http://localhost:${port}`);
});
