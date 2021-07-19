import { IsBoolean, IsDate, IsNumber, Length } from 'class-validator';

export class PontoDto {
    @Length(5, 100)
    email: string;

    @IsNumber()
    timestampDate: Number;

    @IsBoolean()
    registroDeEntrada: Boolean

    public constructor() {
        this.email = '';
        this.timestampDate = Date.now();
        this.registroDeEntrada = false;
    }
}
