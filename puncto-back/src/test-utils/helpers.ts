import { getConnection } from "typeorm";

// import { User } from '../entity/User';

export async function truncate() {
    const connection = await getConnection();
    const entities = connection.entityMetadatas;

    // const repository = await connection.getRepository(User);
    // await repository.clear();

    entities.forEach(async (entity) => {
      const repository = await connection.getRepository(entity.name);
      const recordCount = await repository.count();
      if (recordCount) {
        await repository.clear();
      }
    });
}
