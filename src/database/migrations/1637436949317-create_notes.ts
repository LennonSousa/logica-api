import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createNotes1637436949317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'notes',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'text',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'created_by',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'now()',
                },
                {
                    name: 'updated_by',
                    type: 'varchar',
                },
                {
                    name: 'updated_at',
                    type: 'datetime',
                    default: 'now()',
                },
                {
                    name: 'store_only',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'store_id',
                    type: 'varchar',
                    isNullable: true,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('notes');
    }

}
