import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Price from './PanelPricesModel';
import Estimate from './EstimatesModel';

@Entity('panels')
export default class PanelsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @Column()
    paused: boolean;

    @Column()
    order: number;

    @OneToMany(() => Price, price => price.panel, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'panel_id' })
    prices: Price[];

    @OneToMany(() => Estimate, estimate => estimate.panel)
    @JoinColumn({ name: 'roof_type_id' })
    estimates: Estimate[];
}