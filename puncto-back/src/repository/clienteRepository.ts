import 'reflect-metadata';
import { Connection, getConnection, Repository } from 'typeorm';
import { injectable } from 'inversify';
import { Cliente } from '../entity/Cliente';
import { ClienteDto } from '../dto/clienteDto';
import { DatabaseErrorException } from '../exceptions/DatabaseErrorException';

@injectable()
export class ClienteRepository {

  private getClienteRepository(): Repository<Cliente> {
    const connection: Connection = getConnection();
    return connection.getRepository(Cliente);
  }

  async create(clienteDto: ClienteDto): Promise<void> {
    const repository = this.getClienteRepository();
    const cliente = new Cliente();
    cliente.name = clienteDto.name;
    cliente.cnpj = clienteDto.cnpj;
    cliente.email = clienteDto.email;
    cliente.address = clienteDto.address;
    cliente.userEmail = clienteDto.userEmail;

    await repository.save(cliente);
  }

  async findAllClientes(userEmail: string): Promise<Array<ClienteDto>> {
    const repository = this.getClienteRepository();

    try {
      const allClientes = (await repository.find({ where: { userEmail } })) as ClienteDto[];
      return allClientes;
    } catch (error) {
      throw new DatabaseErrorException('Error finding all clientes in database.');
    }
  }
}
