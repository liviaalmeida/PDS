import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { PontoInicialRequest } from '../dto/pontoInicialRequest';
import { PontoRepository } from '../repository/pontoRepository';
import { PontoDto } from '../dto/pontoDto';
import { PontoRequest } from '../dto/pontoRequest';
import { PontoAbertoDto } from '../dto/pontoAbertoDto';

@injectable()
export class PontoService {
    private _pontoRepository: PontoRepository;
    public constructor(@inject(PontoRepository) pontoRepository: PontoRepository) {
        this._pontoRepository = pontoRepository;
    }

    private createTimestampInicioMes(mes: number): number {
        const dataAtual = new Date()
        return new Date(dataAtual.getFullYear(), mes, 1).getTime();
    }

    private createTimestampFimMes(mes: number): number {
        const dataAtual = new Date()
        return new Date(dataAtual.getFullYear(), mes + 1, 0).getTime();
    }

    private preenchePontosAbertosEFechados(timestampFimMes: number, pontos: Array<PontoDto>): Array<PontoAbertoDto> {
        const numeroDias: number = new Date(timestampFimMes).getDate()
        const pontosAbertos: Array<PontoAbertoDto> = new Array<PontoAbertoDto>()

        for (let dia = 1; dia <= numeroDias; dia++) {
            let diaPossuiAlgumPonto = false

            const diaPossuiPontoAberto = pontos.some(it => {
                const dataEntrada = new Date(it.timestampDateEntrada)
                if (dataEntrada.getDate() == dia) {
                    diaPossuiAlgumPonto = true
                    if (it.timestampDateSaida == undefined)
                        return true
                }

                return false
            })
            pontosAbertos.push(new PontoAbertoDto(dia, diaPossuiPontoAberto, diaPossuiAlgumPonto))
        }

        return pontosAbertos

    }

    async save(userEmail: string, pontoInicialRequest: PontoInicialRequest): Promise<PontoDto> {
        return await this._pontoRepository.save(userEmail, pontoInicialRequest);
    }

    async update(userEmail: string, pontoRequest: PontoRequest): Promise<PontoDto> {
        return await this._pontoRepository.update(userEmail, pontoRequest);
    }

    async find(userEmail: string, timestampDate: number): Promise<Array<PontoDto>> {
        return await this._pontoRepository.find(userEmail, (timestampDate));
    }

    async delete(pontoId: string): Promise<void> {
        return await this._pontoRepository.delete(pontoId);
    }

    async listaPontosAbertosEFechados(userEmail: string, mes: number): Promise<Array<PontoAbertoDto>> {
        const timestampInicioMes = this.createTimestampInicioMes(mes)
        const timestampFimMes = this.createTimestampFimMes(mes)
        const pontos: Array<PontoDto> = await this._pontoRepository.findPontosPorMes(userEmail, timestampInicioMes, timestampFimMes);
        return this.preenchePontosAbertosEFechados(timestampFimMes, pontos)
    }


}
