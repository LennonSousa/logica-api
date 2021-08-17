import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProjects1627480401183 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'projects',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'customer',
                        type: 'varchar',
                    },
                    {
                        name: 'customer_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'document',
                        type: 'varchar(50)',
                    },
                    {
                        name: 'phone',
                        type: 'varchar(50)',
                        isNullable: true,
                    },
                    {
                        name: 'cellphone',
                        type: 'varchar(50)',
                        isNullable: true,
                    },
                    {
                        name: 'contacts',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'zip_code',
                        type: 'varchar'
                    },
                    {
                        name: 'street',
                        type: 'varchar'
                    },
                    {
                        name: 'number',
                        type: 'varchar'
                    },
                    {
                        name: 'neighborhood',
                        type: 'varchar'
                    },
                    {
                        name: 'complement',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'city',
                        type: 'varchar'
                    },
                    {
                        name: 'state',
                        type: 'varchar'
                    },
                    {
                        name: 'coordinates',
                        type: 'varchar',
                    },
                    {
                        name: 'capacity',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'inversor',
                        type: 'varchar',
                    },
                    {
                        name: 'roof_orientation',
                        type: 'varchar',
                    },
                    {
                        name: 'roof_type',
                        type: 'varchar',
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'notes',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'financier_same',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'financier',
                        type: 'varchar',
                    },
                    {
                        name: 'financier_document',
                        type: 'varchar(50)',
                    },
                    {
                        name: 'financier_rg',
                        type: 'varchar(50)',
                        isNullable: true,
                    },
                    {
                        name: 'financier_cellphone',
                        type: 'varchar(50)',
                        isNullable: true,
                    },
                    {
                        name: 'financier_email',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'financier_zip_code',
                        type: 'varchar'
                    },
                    {
                        name: 'financier_street',
                        type: 'varchar'
                    },
                    {
                        name: 'financier_number',
                        type: 'varchar'
                    },
                    {
                        name: 'financier_neighborhood',
                        type: 'varchar'
                    },
                    {
                        name: 'financier_complement',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'financier_city',
                        type: 'varchar'
                    },
                    {
                        name: 'financier_state',
                        type: 'varchar'
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
                        name: 'seller_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'status_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'StatusOnProject',
                        columnNames: ['status_id'],
                        referencedTableName: 'project_status',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('projects');
    }

}
