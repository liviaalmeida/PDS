import { getConnection } from "typeorm";

export async function truncate() {
    const connection = await getConnection();
    const entities = connection.entityMetadatas;

    await Promise.all(entities.map(async (entity) => {
      const repository = await connection.getRepository(entity.name);

      // need to check if there is at least one record, otherwise truncate fails
      const recordCount = await repository.count();
      if (recordCount) {
        console.log(`clearing ${entity.name} repo`);
        await repository.clear();
      }
    }));
}
