import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Estimate from './EstimatesModel';

@Entity('estimate_items')
export default class EstimateItemsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    amount: number;

    @Column()
    price: number;

    @Column()
    order: number;

    @ManyToOne(() => Estimate, estimate => estimate.items)
    @JoinColumn({ name: 'estimate_id' })
    estimate: Estimate;
}