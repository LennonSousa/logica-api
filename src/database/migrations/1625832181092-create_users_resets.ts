import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsersResets1625832181092 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_resets',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'token',
                    type: 'varchar',
                },
                {
                    name: 'expire_at',
                    type: 'datetime',
                },
                {
                    name: 'activated',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'user_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'ResetOnUser',
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_resets');
    }
}
