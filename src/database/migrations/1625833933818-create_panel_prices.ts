import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPanelPrices1625833933818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'panel_prices',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'potency',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'price',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'inversor',
                    type: 'varchar',
                },
                {
                    name: 'panel_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'PriceOnPanel',
                    columnNames: ['panel_id'],
                    referencedTableName: 'panels',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('panel_values');
    }

}
