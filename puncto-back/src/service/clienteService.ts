import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { ClienteRequestDto } from '../dto/clienteRequestDto';
import { ClienteRepository } from '../repository/clienteRepository';
import { ClienteDto } from '../dto/clienteDto';
import { UpdateClienteRequestDto } from '../dto/updateClienteRequestDto';

@injectable()
export class ClienteService {
  private _clienteRepository: ClienteRepository;
  public constructor(@inject(ClienteRepository) clienteRepository: ClienteRepository) {
    this._clienteRepository = clienteRepository;
  }


  async save(userEmail: string, cliente: ClienteRequestDto): Promise<string> {
    return await this._clienteRepository.save(userEmail, cliente);
  }

  async find(userEmail: string, query?: string): Promise<Array<ClienteDto>> {
    return await this._clienteRepository.find(userEmail, query);
  }

  async delete(clienteId: string): Promise<void> {
    return await this._clienteRepository.delete(clienteId);
  }

  async update(cliente: UpdateClienteRequestDto): Promise<ClienteDto> {
    return await this._clienteRepository.update(cliente);
  }
}
