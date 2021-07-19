import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Ponto extends BaseEntity {
    @ObjectIdColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    timestampDate: number;

    @Column()
    registroDeEntrada: boolean;
}
