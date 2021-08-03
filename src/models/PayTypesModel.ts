import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Income from './IncomingsModel';

@Entity('pay_types')
export default class PayTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @Column()
    active: boolean;

    @OneToMany(() => Income, income => income.payType)
    @JoinColumn({ name: 'pay_type_id' })
    incomings: Income[];
}