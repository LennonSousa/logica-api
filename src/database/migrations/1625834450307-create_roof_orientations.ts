import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRoofOrientations1625834450307 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'roof_orientations',
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
                        name: 'increment',
                        type: 'integer',
                        default: 0,
                    },
                    {
                        name: 'order',
                        type: 'integer',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('roof_orientations');
    }

}
