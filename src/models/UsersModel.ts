import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Role from './UsersRolesModel';
import Reset from './UsersResetsModel';
import Estimate from './EstimatesModel';

@Entity('users')
export default class UsersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

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
}