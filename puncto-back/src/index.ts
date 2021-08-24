import { createConnection } from 'typeorm';

import app from './server';
import config from './config';
import { connectionOptions } from './config';

const port = config.port;

if (process.env.NODE_ENV === 'production') {
  // use connection string for prod env
  const { mongoDbUser, mongoDbPwd, mongoDbHost, mongoDbDatabase } = config;
  createConnection({
    type: "mongodb",
    url: `mongodb+srv://${mongoDbUser}:${mongoDbPwd}@${mongoDbHost}/${mongoDbDatabase}?retryWrites=true&w=majority`,
    useNewUrlParser: true,
    entities: [__dirname + '/entity/*{.ts,.js}'],
  }).then(() => listen());
} else {
  createConnection(connectionOptions).then(() => listen());
}

const listen = () => app.listen(port, async () => {
  console.log(`Running on ${process.env.NODE_ENV} environment`);

  console.log(`Server listening at http://localhost:${port}`);
});
