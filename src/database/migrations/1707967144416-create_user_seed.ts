import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserSeed1707971228285 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.connection
      .createQueryBuilder()
      .select()
      .from("users", "user")
      .execute();

    console.log(user[0].id);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
