import { BaseException } from './BaseException';

export class UnauthorizedException extends BaseException {
    constructor(message: string) {
        super();
        this.message = message;
        this.type = 'Unauthorized';
        this.statusCode = 401;
      }
}