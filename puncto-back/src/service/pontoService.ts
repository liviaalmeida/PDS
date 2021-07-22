import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { PontoInicialRequest } from '../dto/pontoInicialRequest';
import { PontoRepository } from '../repository/pontoRepository';
import { PontoDto } from '../dto/pontoDto';
import { PontoRequest } from '../dto/pontoRequest';

@injectable()
export class PontoService {
    private _pontoRepository: PontoRepository;
    public constructor(@inject(PontoRepository) pontoRepository: PontoRepository) {
        this._pontoRepository = pontoRepository;
    }

    private hoursToMiliseconds(hours: number): number {
        return (hours * 60 * 60 * 1000)
    }

    private minutesToMiliseconds(minutes: number): number {
        return (minutes * 60 * 1000)
    }

    private secondsToMiliseconds(seconds: number): number {
        return (seconds * 1000)
    }

    private createAbsoluteInitialTimestamp(timestampDate: number): number {
        var date = new Date(timestampDate)

        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var miliseconds = date.getMilliseconds()

        return (timestampDate - this.hoursToMiliseconds(hours) - this.minutesToMiliseconds(minutes) - this.secondsToMiliseconds(seconds) - miliseconds)
    }

    private createAbsoluteEndTimestamp(absoluteInitialTimestamp: number): number {
        var hoursInMiliseconds = this.hoursToMiliseconds(23)
        var minutesInMiliseconds = this.minutesToMiliseconds(59)
        var secondsInMiliseconds = this.secondsToMiliseconds(59)
        var miliseconds = 999

        return (absoluteInitialTimestamp + hoursInMiliseconds + minutesInMiliseconds + secondsInMiliseconds + miliseconds)
    }

    async save(userEmail: string, pontoInicialRequest: PontoInicialRequest): Promise<PontoDto> {
        return await this._pontoRepository.save(userEmail, pontoInicialRequest);
    }

    async update(userEmail: string, pontoRequest: PontoRequest): Promise<PontoDto> {
        return await this._pontoRepository.update(userEmail, pontoRequest);
    }

    async find(userEmail: string, timestampDate: number): Promise<Array<PontoDto>> {
        var absoluteInitialTimestamp = this.createAbsoluteInitialTimestamp(timestampDate)
        var absoluteEndTimestamp = this.createAbsoluteEndTimestamp(absoluteInitialTimestamp)

        return await this._pontoRepository.find(userEmail, absoluteInitialTimestamp, absoluteEndTimestamp);
    }
}
