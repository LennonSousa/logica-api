import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPanels1625833744237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'panels',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'capacity',
                    type: 'decimal',
                    scale: 2,
                    precision: 10,
                    default: 0.00,
                },
                {
                    name: 'paused',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'order',
                    type: 'integer',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('panels');
    }

}
