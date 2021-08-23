import nodeConfig from 'config';
import { ConnectionOptions } from 'typeorm';

interface Config {
  /** API JWT Secret. */
  secret: string;

  /** The port that the express server should bind to. */
  port: string;

  mongoSsl: boolean;
  mongoDbPort: number;
  mongoDbName: string;
  mongoDbHost: string;
  mongoDbDatabase: string;
  mongoDbUser: string;
  mongoDbPwd: string;
}

const config: Config = {
  secret: nodeConfig.get<string>('secret'),
  port: nodeConfig.get<string>('port'),
  mongoDbPort: nodeConfig.get<string>('mongoDbPort'),
  mongoDbName: nodeConfig.get<string>('mongoDbName'),
  mongoDbHost: nodeConfig.get<string>('mongoDbHost'),
  mongoDbDatabase: nodeConfig.get<string>('mongoDbDatabase'),
  mongoDbUser: nodeConfig.get<string>('mongoDbUser'),
  mongoDbPwd: nodeConfig.get<string>('mongoDbPwd'),
  mongoSsl: nodeConfig.get<string>('mongoSsl'),
};

export const auth = {
  secret: config.secret,
  expires: '7d',
};

export const connectionOptions: ConnectionOptions = {
  name: config.mongoDbName,
  type: 'mongodb',
  port: config.mongoDbPort,
  synchronize: true,
  logging: false,
  host: config.mongoDbHost,
  username: config.mongoDbUser,
  database: config.mongoDbDatabase,
  password: config.mongoDbPwd,
  entities: [__dirname + '/entity/*{.ts,.js}'],
  ssl: config.mongoSsl,
  authSource: 'admin'
};

export default config;