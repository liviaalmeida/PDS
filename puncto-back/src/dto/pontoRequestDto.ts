import { IsBoolean, IsNumber, IsString, Length } from 'class-validator';

export class PontoRequestDto {
    timestampDateEntrada: number;
    timestampDateSaida: number;

    @Length(5, 30)
    clienteId: string;

    @Length(5, 30)
    descricaoAtividade: string;

    public constructor() {
        this.clienteId = '';
        this.descricaoAtividade = '';
    }
}
