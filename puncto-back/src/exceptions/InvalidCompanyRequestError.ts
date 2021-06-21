import { BaseException } from './BaseException';

export default class InvalidCompanyRequestError extends BaseException {
  constructor() {
    super();
    this.message = 'The company data send in the request has some invalid value.';
    this.type = 'InvalidCompanyRequest';
    this.statusCode = 400;
  }
}
