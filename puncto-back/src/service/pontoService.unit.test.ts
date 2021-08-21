import { PontoService } from './pontoService';
import { PontoInicialRequest } from '../dto/pontoInicialRequest';
import { PontoRequest } from '../dto/pontoRequest';

describe('Ponto service', () => {
    let pontoService;
    let mockPontoRepository;
    beforeAll(() => {
        mockPontoRepository = {
            save: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
        };
        pontoService = new PontoService(mockPontoRepository);
    });


    it('Should call save at pontoRepository ', async () => {
        const userEmail = "teste@isEmail.com"
        const ponto = {
            timestampDateEntrada: 1626728432573,
            clienteId: "12xskalm",
            descricaoAtividade: "criando tela inicial"

        } as PontoInicialRequest;
        await pontoService.save(userEmail, ponto);

        expect(mockPontoRepository.save).toHaveBeenCalledTimes(1);
        expect(mockPontoRepository.save).toHaveBeenCalledWith(userEmail, ponto);
    });

    it('Should call update at pontoRepository', async () => {
        const userEmail = "teste@email.com"
        const ponto = {
            id: "abcdefg",
            timestampDateEntrada: 1626728432573,
            timestampDateSaida: 1626728432574,
            clienteId: "12xskalm",
            descricaoAtividade: "criando tela inicial"

        } as PontoRequest;
        await pontoService.update(userEmail, ponto);

        expect(mockPontoRepository.update).toHaveBeenCalledTimes(1);
        expect(mockPontoRepository.update).toHaveBeenCalledWith(userEmail, ponto);
    });

    it('Should call find at pontoRepository', async () => {
        const userEmail = "teste@email.com"
        const timestampDate = Date.now()
        await pontoService.find(userEmail, timestampDate);


        let date = new Date(timestampDate)
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        const absoluteInitialTimestamp:number = date.getTime()

        date.setHours(23)
        date.setMinutes(59)
        date.setSeconds(59)
        date.setMilliseconds(999)
        const absoluteEndTimestamp = date.getTime()

        expect(mockPontoRepository.find).toHaveBeenCalledTimes(1);
        // expect(mockPontoRepository.find).toHaveBeenCalledWith(userEmail, absoluteInitialTimestamp, absoluteEndTimestamp);
    });

    it('Should call delete at pontoRepository', async () => {
        const pontoId = "1626728432575"
        await pontoService.delete(pontoId);

        expect(mockPontoRepository.delete).toHaveBeenCalledTimes(1);
        expect(mockPontoRepository.delete).toHaveBeenCalledWith(pontoId);
    });
});
