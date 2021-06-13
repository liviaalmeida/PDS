import { BaseException } from './BaseException';

export class DatabaseErrorException extends BaseException {
    constructor(message: string) {
        super();
        this.message = message;
        this.type = 'DatabaseError';
        this.statusCode = 503;
      }
}