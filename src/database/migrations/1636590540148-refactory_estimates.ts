import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryEstimates1636590540148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`estimates\` ` +
            `ADD COLUMN \`customer_from\` VARCHAR(255) NOT NULL AFTER \`customer_id\`, ` +
            `ADD COLUMN \`store_id\` VARCHAR(255) NULL AFTER \`user_id\`;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`estimates\` ` +
            `DROP COLUMN \`customer_from\`, ` +
            `DROP COLUMN \`store_id\`;`);
    }

}
