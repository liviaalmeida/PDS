import { Length } from 'class-validator'; 

export class InvoiceDto {
  invoiceNumber: number;

  @Length(5, 100)
  contractorTitle: string;

  @Length(5, 100)
  clientTitle: string;

  @Length(5, 100)
  clientId: string;

  @Length(5, 100)
  greeting: string;

  @Length(5, 100)
  motivation: string;

  hourlyRate: number;

  @Length(1, 100)
  currency: string;

  paymentTerms: string;

  paymentInstructions: string;

  bankInfo: string;

  thankYouText: string;

  signature: string;

  totalHours: number;

  createdAt: string;
}
