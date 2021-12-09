import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createNotifications1638638942358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'notifications',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid'
                },
                {
                    name: 'recipients',
                    type: 'json',
                },
                {
                    name: 'group',
                    type: 'ENUM(\'estimates\', \'projects\')',
                },
                {
                    name: 'stage_id',
                    type: 'varchar',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('notifications');
    }

}
