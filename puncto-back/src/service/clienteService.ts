import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { ClienteDto } from '../dto/clienteDto';
import { ClienteRepository } from '../repository/clienteRepository';

@injectable()
export class ClienteService {
  private _clienteRepository: ClienteRepository;
  public constructor(@inject(ClienteRepository) clienteRepository: ClienteRepository) {
    this._clienteRepository = clienteRepository;
  }


  async create(cliente: ClienteDto): Promise<void> {
    await this._clienteRepository.create(cliente);
  }

  async findAllClientes(userEmail: string): Promise<Array<ClienteDto>> {
    return await this._clienteRepository.findAllClientes(userEmail)
  }
}
