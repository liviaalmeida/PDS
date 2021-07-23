import { IsNotEmpty, Length } from 'class-validator';

export class PontoInicialRequest {
    @IsNotEmpty()
    timestampDateEntrada: number;
    @Length(5, 30)
    clienteId: string;
    @Length(5, 30)
    descricaoAtividade: string;

    public constructor() {
        this.clienteId = '';
        this.descricaoAtividade = '';
    }
}
