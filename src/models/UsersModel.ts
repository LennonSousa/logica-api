import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Store from './StoresModel';
import Role from './UsersRolesModel';
import Reset from './UsersResetsModel';
import Estimate from './EstimatesModel';
import ServiceOrder from './ServiceOrdersModel';
import Share from './NoteSharesModel';

@Entity('users')
export default class UsersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    document: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    active: boolean;

    @Column()
    paused: boolean;

    @Column()
    root: boolean;

    @Column()
    store_only: boolean;

    @ManyToOne(() => Store, store => store.users)
    @JoinColumn({ name: 'store_id' })
    store: Store;

    @Column()
    created_at: Date;

    @OneToMany(() => Role, role => role.user, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'users_id' })
    roles: Role[];

    @OneToMany(() => Reset, reset => reset.user)
    @JoinColumn({ name: 'user_id' })
    resets: Reset[];

    @OneToMany(() => Estimate, estimate => estimate.user)
    @JoinColumn({ name: 'user_id' })
    estimates: Estimate[];

    @OneToMany(() => ServiceOrder, serviceOrder => serviceOrder.user)
    @JoinColumn({ name: 'user_id' })
    serviceOrders: ServiceOrder[];

    @OneToMany(() => Share, share => share.user)
    @JoinColumn({ name: 'user_id' })
    notes: Share[];
}