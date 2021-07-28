import { ClienteService } from './clienteService';
import { ClienteRequestDto } from '../dto/clienteRequestDto';

describe('Cliente service', () => {
  let clienteService;
  let mockClienteRepository;
  beforeAll(() => {
    mockClienteRepository = {
      save: jest.fn(),
      find: jest.fn()
    };
    clienteService = new ClienteService(mockClienteRepository);
  });


  it('Should call save at clienteRepository ', async () => {
    const userEmail = "teste@email.com"
    const cliente = {
      name: 'inter',
      cnpj: '123903843',
      email: 'banco@inter.com',
      address: 'rua pernambuco, 231, savassi',
    } as ClienteRequestDto;
    await clienteService.save(userEmail, cliente);

    expect(mockClienteRepository.save).toHaveBeenCalledTimes(1);
    expect(mockClienteRepository.save).toHaveBeenCalledWith(userEmail, cliente);
  });

  it('Should call find at clienteRepository ', async () => {
    const userEmail = "teste@email.com"
    await clienteService.find(userEmail);

    expect(mockClienteRepository.find).toHaveBeenCalledTimes(1);
    expect(mockClienteRepository.find).toHaveBeenCalledWith(userEmail, undefined);
  });
});
