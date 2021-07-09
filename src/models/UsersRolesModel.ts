import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import User from './UsersModel';

@Entity('users_roles')
export default class UsersRolesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    role: string;

    @Column()
    view: boolean;

    @Column()
    view_self: boolean;

    @Column()
    create: boolean;

    @Column()
    update: boolean;

    @Column()
    update_self: boolean;

    @Column()
    remove: boolean;

    @ManyToOne(() => User, user => user.roles)
    @JoinColumn({ name: 'users_id' })
    user: User;
}