import { PontoService } from './pontoService';
import { PontoDto } from '../dto/pontoDto';

describe('Ponto service', () => {
    let pontoService;
    let mockPontoRepository;
    beforeAll(() => {
        mockPontoRepository = {
            save: jest.fn()
        };
        pontoService = new PontoService(mockPontoRepository);
    });


    it('Should call create at clienteRepository ', async () => {
        const ponto = {
            email: "teste@email.com",
            timestampDate: 1626728432575,
            registroDeEntrada: false
        } as PontoDto;
        await pontoService.save(ponto);

        expect(mockPontoRepository.save).toHaveBeenCalledTimes(1);
        expect(mockPontoRepository.save).toHaveBeenCalledWith(ponto);
    });
});
