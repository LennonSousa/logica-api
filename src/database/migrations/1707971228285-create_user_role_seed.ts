import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserSeed1707963084212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.connection
      .createQueryBuilder()
      .select()
      .from("users", "user")
      .execute();

    console.log(user[0].id);

    await queryRunner.connection
      .createQueryRunner()
      .query(
        "INSERT INTO `users_roles` (`id`, `role`, `view`, `view_self`, `create`, `update`, `update_self`, `remove`, `users_id`) " +
          `VALUES ('cd90de94-4dd1-4652-a23d-6177d027544b', 'estimates', 1, 1, 1, 1, 1, 1, '${user[0].id}'), ('ea5c54b0-0ecc-4415-9a79-61a272b8cc82', 'projects', 1, 1, 1, 1, 1, 1, '${user[0].id}'), ('964e993e-bbb4-4211-adad-8f4122682331', 'services', 1, 1, 1, 1, 1, 1, '${user[0].id}'), ('f335412d-57d5-4772-838e-a63aa8c4b1f9', 'settings', 1, 1, 1, 1, 1, 1, '${user[0].id}'), ('5012c12c-32e7-42d8-9c2d-790f6953ff16', 'store', 1, 1, 1, 1, 1, 1, '${user[0].id}'), ('887b78e9-028b-4988-bd42-e5f2f9b40e1d', 'finances', 1, 1, 1, 1, 1, 1, '${user[0].id}'), ('4216cff5-2d05-452b-b96e-ffe8e294b304', 'users', 1, 1, 1, 1, 1, 1, '${user[0].id}')`
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
