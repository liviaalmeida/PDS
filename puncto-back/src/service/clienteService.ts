import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { ClienteDto } from '../dto/clienteDto';
import InvalidCompanyRequestError from '../exceptions/InvalidClienteRequestError';
import { ClienteRepository } from '../repository/clienteRepository';

@injectable()
export class ClienteService {
  private _clienteRepository: ClienteRepository;
  public constructor(@inject(ClienteRepository) clienteRepository: ClienteRepository) {
    this._clienteRepository = clienteRepository;
  }

  validCliente(cliente: ClienteDto): Boolean {
    if (cliente.email && cliente.cnpj && cliente.address && cliente.name) return true;

    return false;
  }

  async create(cliente: ClienteDto): Promise<void> {
    if (!this.validCliente(cliente)) throw new InvalidCompanyRequestError();

    await this._clienteRepository.create(cliente);
  }
}
