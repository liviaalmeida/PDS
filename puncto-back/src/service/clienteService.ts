import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { ClienteRequestDto } from '../dto/clienteRequestDto';
import { ClienteRepository } from '../repository/clienteRepository';
import { ClienteDto } from '../dto/clienteDto';

@injectable()
export class ClienteService {
  private _clienteRepository: ClienteRepository;
  public constructor(@inject(ClienteRepository) clienteRepository: ClienteRepository) {
    this._clienteRepository = clienteRepository;
  }


  async create(userEmail: string, cliente: ClienteRequestDto): Promise<Number> {
    return await this._clienteRepository.create(userEmail, cliente);
  }

  async findAllClientes(userEmail: string): Promise<Array<ClienteDto>> {
    return await this._clienteRepository.findAllClientes(userEmail)
  }
}
