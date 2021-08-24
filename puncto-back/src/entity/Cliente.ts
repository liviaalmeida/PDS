import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Cliente extends BaseEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  addressTwo: string;

  @Column()
  addressThree: string;

  @Column()
  userEmail: string;
}
