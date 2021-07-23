
export class PontoAbertoDto {
    dia: number;
    aberto: boolean;

    public constructor(dia: number, aberto: boolean) {
        this.dia = dia;
        this.aberto = aberto;
    }
}
