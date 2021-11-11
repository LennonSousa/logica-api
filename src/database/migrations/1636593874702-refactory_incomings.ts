import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryIncomings1636593874702 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`incomings\` ` +
            `ADD COLUMN \`created_by\` VARCHAR(255) NOT NULL AFTER \`created_at\`, ` +
            `ADD COLUMN \`store_id\` VARCHAR(255) NULL AFTER \`created_by\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`incomings\` ` +
            `DROP COLUMN \`created_by\`, ` +
            `DROP COLUMN \`store_id\`;`);
    }

}
