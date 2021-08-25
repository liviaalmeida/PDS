import 'reflect-metadata';
import { Connection, getConnection, Repository } from 'typeorm';
import { injectable } from 'inversify';
import { Invoice } from '../entity/Invoice';
import { InvoiceDto } from '../dto/invoiceDto';
import { DatabaseErrorException } from '../exceptions/DatabaseErrorException';

@injectable()
export class InvoiceRepository {
  private getInvoiceRepository(): Repository<Invoice> {
    const connection: Connection = getConnection();
    return connection.getRepository(Invoice);
  }

  async save(userEmail: string, invoiceDto: InvoiceDto): Promise<number> {
    const repository = this.getInvoiceRepository();
    const invoice = new Invoice();

    invoice.userEmail = userEmail;
    invoice.invoiceNumber = invoiceDto.invoiceNumber;
    invoice.contractorTitle = invoiceDto.contractorTitle;
    invoice.clientTitle = invoiceDto.clientTitle;
    invoice.clientId = invoiceDto.clientId;
    invoice.greeting = invoiceDto.greeting;
    invoice.motivation = invoiceDto.motivation;
    invoice.hourlyRate = invoiceDto.hourlyRate;
    invoice.currency = invoiceDto.currency;
    invoice.paymentTerms = invoiceDto.paymentTerms;
    invoice.paymentInstructions = invoiceDto.paymentInstructions;
    invoice.bankInfo = invoiceDto.bankInfo;
    invoice.thankYouText = invoiceDto.thankYouText;
    invoice.signature = invoiceDto.signature;
    invoice.totalHours = invoiceDto.totalHours;
    invoice.createdAt = invoiceDto.createdAt;

    const inserted = await repository.save(invoice);
    return inserted.id;
  }

  async find(userEmail: string): Promise<Array<InvoiceDto>> {
    const repository = this.getInvoiceRepository();

    try {
      const whereClause = { where: { userEmail } };
      
      const allInvoices = (await repository.find(whereClause)) as InvoiceDto[];
      return allInvoices;
    } catch (error) {
      throw new DatabaseErrorException('Error finding all invoices in database.');
    }
  }

  async findOne(userEmail: string, id: string): Promise<InvoiceDto> {
    const repository = this.getInvoiceRepository();
    try {
      const whereClause = { where: { userEmail, _id: id } };
      
      const invoice = (await repository.findOne(whereClause)) as InvoiceDto;
      return invoice;
    } catch (error) {
      throw new DatabaseErrorException('Error finding invoice in database.');
    }
  }
}
