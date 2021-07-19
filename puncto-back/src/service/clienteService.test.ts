import { ClienteService } from './clienteService';
import { ClienteDto } from '../dto/clienteDto';

describe('Cliente service', () => {
  let clienteService;
  let mockClienteRepository;
  beforeAll(() => {
    mockClienteRepository = {
      create: jest.fn(),
      findAllClientes: jest.fn()
    };
    clienteService = new ClienteService(mockClienteRepository);
  });


  it('Should call create at clienteRepository ', async () => {
    const cliente = {
      name: 'inter',
      cnpj: '123903843',
      email: 'banco@inter.com',
      address: 'rua pernambuco, 231, savassi',
    } as ClienteDto;
    await clienteService.create(cliente);

    expect(mockClienteRepository.create).toHaveBeenCalledTimes(1);
    expect(mockClienteRepository.create).toHaveBeenCalledWith(cliente);
  });

  it('Should call findAllClientes at clienteRepository ', async () => {
    const userEmail = "teste@email.com"
    await clienteService.findAllClientes(userEmail);

    expect(mockClienteRepository.findAllClientes).toHaveBeenCalledTimes(1);
    expect(mockClienteRepository.findAllClientes).toHaveBeenCalledWith(userEmail);
  });
});
