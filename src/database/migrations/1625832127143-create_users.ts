import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1625832127143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'phone',
                    type: 'varchar(50)',
                    isNullable: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'varchar'
                },
                {
                    name: 'active',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'paused',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'root',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'now()',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
