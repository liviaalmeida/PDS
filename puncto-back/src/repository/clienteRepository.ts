import 'reflect-metadata';
import { Connection, getConnection, Repository } from 'typeorm';
import { injectable } from 'inversify';
import { Cliente } from '../entity/Cliente';
import { ClienteRequestDto } from '../dto/clienteRequestDto';
import { DatabaseErrorException } from '../exceptions/DatabaseErrorException';
import { ClienteDto } from '../dto/clienteDto';

@injectable()
export class ClienteRepository {

  private getClienteRepository(): Repository<Cliente> {
    const connection: Connection = getConnection();
    return connection.getRepository(Cliente);
  }

  async save(userEmail: string, clienteDto: ClienteRequestDto): Promise<number> {
    const repository = this.getClienteRepository();
    const cliente = new Cliente();
    cliente.name = clienteDto.name;
    cliente.cnpj = clienteDto.cnpj;
    cliente.email = clienteDto.email;
    cliente.address = clienteDto.address;
    cliente.userEmail = userEmail;

    const inserted = await repository.save(cliente);
    return inserted.id;
  }

  async find(userEmail: string, query?: string): Promise<Array<ClienteDto>> {
    const repository = this.getClienteRepository();

    try {
      const whereClause = query ? { where: { userEmail, name: new RegExp(`^${query}`) } } : { where: { userEmail } };
      
      const allClientes = (await repository.find(whereClause)) as ClienteDto[];
      return allClientes;
    } catch (error) {
      throw new DatabaseErrorException('Error finding all clientes in database.');
    }
  }
}
