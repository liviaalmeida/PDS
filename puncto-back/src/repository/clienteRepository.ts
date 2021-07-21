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

  async create(userEmail: string, clienteDto: ClienteRequestDto): Promise<Number> {
    const repository = this.getClienteRepository();
    const cliente = new Cliente();
    cliente.name = clienteDto.name;
    cliente.cnpj = clienteDto.cnpj;
    cliente.email = clienteDto.email;
    cliente.address = clienteDto.address;
    cliente.userEmail = userEmail;

    var inserted = await repository.save(cliente);
    return inserted.id;
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
