import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsersRoles1625832148559 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_roles',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'role',
                    type: 'varchar(100)',
                },
                {
                    name: 'view',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'view_self',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'create',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'update',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'update_self',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'remove',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'users_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'RolesOnUser',
                    columnNames: ['users_id'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_roles');
    }
}
