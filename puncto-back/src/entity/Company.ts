import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Company extends BaseEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  email: string;

  @Column()
  address: string;
}
