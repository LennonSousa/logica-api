import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createIncomings1627910444821 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'incomings',
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
                        name: 'project_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'value',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'created_at',
                        type: 'date',
                        default: '(CURRENT_DATE)',
                    },
                    {
                        name: 'created_by',
                        type: 'varchar',
                    },
                    {
                        name: 'store_id',
                        type: 'varchar',
                    },
                    {
                        name: 'pay_type_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'StoreOnIncome',
                        columnNames: ['store_id'],
                        referencedTableName: 'stores',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        name: 'PayTypeOnIncome',
                        columnNames: ['pay_type_id'],
                        referencedTableName: 'pay_types',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('incomings');
    }

}
