import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createNoteAttachments1637437067124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'note_attachments',
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
                    name: 'path',
                    type: 'varchar',
                },
                {
                    name: 'note_id',
                    type: 'varchar',
                },
            ],
            foreignKeys: [
                {
                    name: 'NoteOnAttachment',
                    columnNames: ['note_id'],
                    referencedTableName: 'notes',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('note_attachments');
    }

}
