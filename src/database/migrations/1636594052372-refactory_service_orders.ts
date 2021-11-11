import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryServiceOrders1636594052372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`service_orders\` ` +
            `ADD COLUMN \`technical\` VARCHAR(255) NOT NULL AFTER \`finish_at\`, ` +
            `ADD COLUMN \`created_by\` VARCHAR(255) NOT NULL AFTER \`technical\`, ` +
            `ADD COLUMN \`user_id\` VARCHAR(255) NULL AFTER \`created_by\`, ` +
            `ADD COLUMN \`store_id\` VARCHAR(255) NULL AFTER \`project_id\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`service_orders\` ` +
            `DROP COLUMN \`technical\`, ` +
            `DROP COLUMN \`created_by\`, ` +
            `DROP COLUMN \`user_id\`, ` +
            `DROP COLUMN \`store_id\`;`);
    }

}
