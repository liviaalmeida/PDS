import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Invoice extends BaseEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  userEmail: string;

  @Column()
  invoiceNumber: number;

  @Column()
  contractorTitle: string;

  @Column()
  clientTitle: string;

  @Column()
  clientId: string;

  @Column()
  greeting: string;

  @Column()
  motivation: string;

  @Column()
  hourlyRate: number;

  @Column()
  currency: string;

  @Column()
  paymentTerms: string;

  @Column()
  paymentInstructions: string;

  @Column()
  bankInfo: string;

  @Column()
  thankYouText: string;

  @Column()
  signature: string;
}
