import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createServiceOrders1634154995516 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table
            ({
                name: 'service_orders',
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
                        name: 'document',
                        type: 'varchar(50)',
                        isNullable: true,
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
                        name: 'wifi_name',
                        type: 'varchar',
                    },
                    {
                        name: 'wifi_password',
                        type: 'varchar',
                    },
                    {
                        name: 'roof_details',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'electric_type',
                        type: 'varchar',
                    },
                    {
                        name: 'inversor_brand',
                        type: 'varchar',
                    },
                    {
                        name: 'inversor_potency',
                        type: 'decimal',
                        scale: 2,
                        precision: 10,
                        default: 0.00,
                    },
                    {
                        name: 'module_brand',
                        type: 'varchar',
                    },
                    {
                        name: 'module_amount',
                        type: 'integer',
                    },
                    {
                        name: 'test_leak',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'test_meter',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'test_monitor',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'explanation',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'technical',
                        type: 'varchar',
                    },
                    {
                        name: 'start_at',
                        type: 'datetime',
                        default: 'Now()',
                    },
                    {
                        name: 'finish_at',
                        type: 'datetime',
                        default: 'Now()',
                    },
                    {
                        name: 'project_id',
                        type: 'varchar',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'ProjectOnServiceOrder',
                        columnNames: ['project_id'],
                        referencedTableName: 'projects',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('service_orders');
    }

}
