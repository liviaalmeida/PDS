import { ClienteService } from './clienteService';
import { ClienteRequestDto } from '../dto/clienteRequestDto';
import { ClienteDto } from '../dto/clienteDto';

describe('Cliente service', () => {
  let clienteService;
  let mockClienteRepository;
  beforeAll(() => {
    mockClienteRepository = {
      save: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
      update: jest.fn()
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

  it('Should call delete at clienteRepository ', async () => {
    const clienteId = "1"
    await clienteService.delete(clienteId);

    expect(mockClienteRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockClienteRepository.delete).toHaveBeenCalledWith(clienteId);
  });

  it('Should call update at clienteRepository ', async () => {
    const cliente = new ClienteDto()
    cliente.id = '1';
    cliente.name = "nome cliente";
    cliente.address = "address 1";
    cliente.addressTwo = "address 2";
    cliente.addressThree = "address 3";
    cliente.cnpj = "123456789";
    cliente.email = "emailcliente@gmail.com";

    await clienteService.update(cliente);

    expect(mockClienteRepository.update).toHaveBeenCalledTimes(1);
    expect(mockClienteRepository.update).toHaveBeenCalledWith(cliente);
  });
});
