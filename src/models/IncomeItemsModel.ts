import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Income from './IncomingsModel';

@Entity('income_items')
export default class IncomeItemsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    description: string;

    @Column()
    value: number;

    @Column()
    is_paid: boolean;

    @Column()
    received_at: Date;

    @ManyToOne(() => Income, project => project.items)
    @JoinColumn({ name: 'income_id' })
    income: Income;
}