import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createEstimates1625834863810 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'estimates',
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
                        name: 'address',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                    },
                    {
                        name: 'energy_company',
                        type: 'varchar',
                    },
                    {
                        name: 'unity',
                        type: 'varchar',
                    },
                    {
                        name: 'kwh',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'irradiation',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'month_01',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'month_02',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'month_03',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'month_04',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'month_05',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'month_06',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'month_07',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'month_08',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'month_09',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'month_10',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'month_11',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'month_12',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'month_13',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'average_increase',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'discount',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'increase',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'percent',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'show_values',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'show_discount',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'notes',
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
                        name: 'user_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'panel_id',
                        type: 'varchar',
                    },
                    {
                        name: 'roof_orientation_id',
                        type: 'varchar',
                    },
                    {
                        name: 'roof_type_id',
                        type: 'varchar',
                    },
                    {
                        name: 'status_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'PanelOnEstimate',
                        columnNames: ['panel_id'],
                        referencedTableName: 'panels',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                    {
                        name: 'RoofOrientationOnEstimate',
                        columnNames: ['roof_orientation_id'],
                        referencedTableName: 'roof_orientations',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        name: 'RoofTypeOnEstimate',
                        columnNames: ['roof_type_id'],
                        referencedTableName: 'roof_types',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                    {
                        name: 'StatusOnEstimate',
                        columnNames: ['status_id'],
                        referencedTableName: 'estimate_status',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('estimates');
    }

}
