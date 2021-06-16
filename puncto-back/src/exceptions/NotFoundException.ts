import { BaseException } from './BaseException';

export class NotFoundException extends BaseException {
    constructor(message: string) {
        super();
        this.message = message;
        this.type = 'NotFound';
        this.statusCode = 404;
      }
}