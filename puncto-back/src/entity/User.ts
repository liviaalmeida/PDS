import { Entity, ObjectIdColumn, Column, BaseEntity, BeforeUpdate, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.password) {
      const salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, salt);
    }
  }
}
