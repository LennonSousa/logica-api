import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Estimate from './EstimatesModel';
import Incoming from './IncomingsModel';
import Project from './ProjectsModel';
import ServiceOrder from './ServiceOrdersModel';
import User from './UsersModel';

@Entity('stores')
export default class StoresModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    title: string;

    @Column()
    name: string;

    @Column()
    avatar: string;

    @Column()
    phone: string;

    @Column()
    description: string;

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
    document: string;

    @Column()
    services_in: string;

    @Column()
    warranty: string;

    @Column()
    engineer: string;

    @Column()
    active: boolean;

    @OneToMany(() => Estimate, estimate => estimate.store)
    @JoinColumn({ name: 'store_id' })
    estimates: Estimate[];

    @OneToMany(() => Incoming, incoming => incoming.store)
    @JoinColumn({ name: 'store_id' })
    incomings: Incoming[];

    @OneToMany(() => Project, project => project.store)
    @JoinColumn({ name: 'store_id' })
    projects: Project[];

    @OneToMany(() => ServiceOrder, serviceOrder => serviceOrder.store)
    @JoinColumn({ name: 'store_id' })
    serviceOrders: ServiceOrder[];

    @OneToMany(() => User, user => user.store)
    @JoinColumn({ name: 'store_id' })
    users: User[];
}