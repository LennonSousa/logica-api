import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryUsers1636591245178 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ` +
            `ADD COLUMN \`document\` VARCHAR(50) NOT NULL AFTER \`name\`, ` +
            `ADD COLUMN \`store_only\` TINYINT(1) NOT NULL DEFAULT '0' AFTER \`root\`, ` +
            `ADD COLUMN \`store_id\` VARCHAR(255) NULL AFTER \`store_only\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ` +
            `DROP COLUMN \`document\`, ` +
            `DROP COLUMN \`store_only\`, ` +
            `DROP COLUMN \`store_id\`;`);
    }

}
