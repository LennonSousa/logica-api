import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProjectAttachmentsRequired1627909461657 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'project_attachments_required',
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
                        isNullable: true,
                    },
                    {
                        name: 'received_at',
                        type: 'date',
                        default: '(CURRENT_DATE)',
                    },
                    {
                        name: 'attachment_id',
                        type: 'varchar',
                    },
                    {
                        name: 'project_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'AttachmentOnAttachmentRequired',
                        columnNames: ['attachment_id'],
                        referencedTableName: 'attachments_required_project',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        name: 'ProjectOnAttachmentRequired',
                        columnNames: ['project_id'],
                        referencedTableName: 'projects',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('project_attachments_required');
    }

}
