import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { InvoiceDto } from '../dto/invoiceDto';
import { InvoiceRepository } from '../repository/invoiceRepository';

@injectable()
export class InvoiceService {
  private _invoiceRepository: InvoiceRepository;
  public constructor(@inject(InvoiceRepository) invoiceRepository: InvoiceRepository) {
    this._invoiceRepository = invoiceRepository;
  }

  async save(userEmail: string, invoice: InvoiceDto): Promise<number> {
    return await this._invoiceRepository.save(userEmail, invoice);
  }

  async find(userEmail: string): Promise<Array<InvoiceDto>> {
    return await this._invoiceRepository.find(userEmail);
  }

  async findOne(userEmail: string, id: string): Promise<InvoiceDto> {
    return await this._invoiceRepository.findOne(userEmail, id);
  }
}
