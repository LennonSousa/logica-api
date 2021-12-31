import { MigrationInterface, QueryRunner } from "typeorm";

export class refactoryUsers1640914171524 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE \`users\` ' +
            'ADD COLUMN `discount_limit` DECIMAL(10,2) NOT NULL DEFAULT \'0.00\' AFTER \`store_only\`;');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE \`users\` ' +
            'DROP COLUMN `discount_limit`;');
    }

}
