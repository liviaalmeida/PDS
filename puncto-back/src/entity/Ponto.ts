import { Entity, ObjectIdColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Ponto extends BaseEntity {
    @ObjectIdColumn()
    id: number;

    @Column()
    timestampDateEntrada: number;

    @Column()
    timestampDateSaida: number;

    @Column()
    clienteId: string;

    @Column()
    descricaoAtividade: string;

    @Column()
    userEmail: string;
}
