import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class refactoryStores1639782527058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const storesTable = await queryRunner.getTable('stores');

        await queryRunner.addColumn(storesTable, new TableColumn({
            name: 'bank_account',
            type: 'text',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const storesTable = await queryRunner.getTable('stores');

        await queryRunner.dropColumn(storesTable, 'bank_account');
    }

}
