import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createIncomeAttachments1627911313354 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'income_attachments',
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
                        name: 'path',
                        type: 'varchar',
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
                        name: 'IncomeOnAttachment',
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
        await queryRunner.dropTable('income_attachments');
    }

}
