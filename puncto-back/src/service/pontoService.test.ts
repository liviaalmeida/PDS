import { PontoService } from './pontoService';
import { PontoInicialRequest } from '../dto/pontoInicialRequest';

describe('Ponto service', () => {
    let pontoService;
    let mockPontoRepository;
    beforeAll(() => {
        mockPontoRepository = {
            save: jest.fn(),
            findAll: jest.fn(),
            find: jest.fn(),
        };
        pontoService = new PontoService(mockPontoRepository);
    });


    it('Should call create at clienteRepository ', async () => {
        const ponto = {
            timestampDateEntrada: 1626728432573
        } as PontoInicialRequest;
        await pontoService.save(ponto);

        expect(mockPontoRepository.save).toHaveBeenCalledTimes(1);
        expect(mockPontoRepository.save).toHaveBeenCalledWith(ponto);
    });

    it('Should list all pontos for user', async () => {
        const userEmail = "teste@email.com"
        await pontoService.findAll(userEmail);

        expect(mockPontoRepository.findAll).toHaveBeenCalledTimes(1);
        expect(mockPontoRepository.findAll).toHaveBeenCalledWith(userEmail);
    });

    it('Should list registers from the same day as the timestamp for the user', async () => {
        const userEmail = "teste@email.com"
        const timestampDate = 1626728432575
        await pontoService.find(userEmail, timestampDate);

        expect(mockPontoRepository.find).toHaveBeenCalledTimes(1);
        expect(mockPontoRepository.find).toHaveBeenCalledWith(userEmail, timestampDate);
    });
});
