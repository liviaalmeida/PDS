import { BaseException } from './BaseException';

export default class InvalidClienteRequestError extends BaseException {
  constructor() {
    super();
    this.message = 'The cliente data send in the request has some invalid value.';
    this.type = 'InvalidCompanyRequest';
    this.statusCode = 400;
  }
}
