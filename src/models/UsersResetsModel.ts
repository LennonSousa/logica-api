import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import User from './UsersModel';

@Entity('users_resets')
export default class UsersResetsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    token: string;

    @Column()
    expire_at: Date;

    @Column()
    activated: boolean;

    @ManyToOne(() => User, user => user.resets)
    @JoinColumn({ name: 'user_id' })
    user: User;
}