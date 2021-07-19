import { IsBoolean, IsNumber, Length } from 'class-validator';

export class PontoDto {
    @Length(5, 100)
    email: string;

    @IsNumber()
    timestampDate: number;

    @IsBoolean()
    registroDeEntrada: boolean

    public constructor() {
        this.email = '';
        this.timestampDate = Date.now();
        this.registroDeEntrada = false;
    }
}
