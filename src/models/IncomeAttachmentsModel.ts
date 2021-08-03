import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Income from './IncomingsModel';

@Entity('income_attachments')
export default class IncomeAttachmentsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    received_at: Date;

    @ManyToOne(() => Income, income => income.attachments)
    @JoinColumn({ name: 'income_id' })
    income: Income;
}