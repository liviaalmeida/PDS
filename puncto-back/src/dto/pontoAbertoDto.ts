
export class PontoAbertoDto {
    dia: number;
    aberto: boolean;
    possuiPonto: boolean;

    public constructor(dia: number, aberto: boolean, possuiPonto: boolean) {
        this.dia = dia;
        this.aberto = aberto;
        this.possuiPonto = possuiPonto;
    }
}
