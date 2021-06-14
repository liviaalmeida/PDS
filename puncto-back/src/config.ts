import { ConnectionOptions } from 'typeorm';

export const auth = {
  secret: '0917B13A9091915D54B6336F45909539CCE452B3661B21F38641', // @TODO move to env variables
  expires: '7d',
};

export const connectionOptions: ConnectionOptions = {
  name: 'default',
  type: 'mongodb',
  port: 27017,
  synchronize: true,
  logging: false,
  host: 'localhost',
  username: 'root',
  database: 'admin',
  password: 'example',
  entities: [__dirname + '/entity/*{.ts,.js}'],
};
