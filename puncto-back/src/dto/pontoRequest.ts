import { IsBoolean, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class PontoRequest {
    @IsNotEmpty()
    id: string;
    @IsNotEmpty()
    timestampDateEntrada: number;
    @IsNotEmpty()
    timestampDateSaida: number;
    @Length(5, 30)
    clienteId: string;
    @Length(5, 30)
    descricaoAtividade: string;
}
