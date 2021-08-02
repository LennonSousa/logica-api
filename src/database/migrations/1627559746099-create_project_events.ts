import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProjectEvents1627559746099 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'project_events',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'notes',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'done',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'done_at',
                        type: 'date',
                        default: '(CURRENT_DATE)',
                    },
                    {
                        name: 'project_id',
                        type: 'varchar',
                    },
                    {
                        name: 'event_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'ProjectOnEvent',
                        columnNames: ['project_id'],
                        referencedTableName: 'projects',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                    {
                        name: 'EventOnEvent',
                        columnNames: ['event_id'],
                        referencedTableName: 'events_project',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('project_events');
    }

}
