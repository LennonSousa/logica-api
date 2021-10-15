import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Project from './ProjectsModel';

@Entity('service_orders')
export default class ServiceOrdersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    customer: string;

    @Column()
    document: string;

    @Column()
    phone: string;

    @Column()
    cellphone: string;

    @Column()
    contacts: string;

    @Column()
    email: string;

    @Column()
    zip_code: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    neighborhood: string;

    @Column()
    complement: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    coordinates: string;

    @Column()
    wifi_name: string;

    @Column()
    wifi_password: string;

    @Column()
    roof_details: string;

    @Column()
    electric_type: string;

    @Column()
    inversor_brand: string;

    @Column()
    inversor_potency: number;

    @Column()
    module_brand: string;

    @Column()
    module_amount: number;

    @Column()
    test_leak: boolean;

    @Column()
    test_meter: boolean;

    @Column()
    test_monitor: boolean;

    @Column()
    explanation: boolean;

    @Column()
    start_at: Date;

    @Column()
    finish_at: Date;

    @ManyToOne(() => Project, project => project.serviceOrders)
    @JoinColumn({ name: 'project_id' })
    project: Project;
}