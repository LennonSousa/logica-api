import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createIncomeItems1627910461114 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'income_items',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'value',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'is_paid',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'received_at',
                        type: 'date',
                        default: '(CURRENT_DATE)',
                    },
                    {
                        name: 'income_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'IncomeOnItem',
                        columnNames: ['income_id'],
                        referencedTableName: 'incomings',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('income_items');
    }

}
