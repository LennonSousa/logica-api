import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryProjects1636593709364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` ` +
            `ADD COLUMN \`store_id\` VARCHAR(255) NULL AFTER \`seller_id\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` ` +
            `DROP COLUMN \`store_id\`;`);
    }

}
