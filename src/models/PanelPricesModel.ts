import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Panel from './PanelsModel';

@Entity('panel_prices')
export default class PanelPricesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    potency: number;

    @Column()
    price: number;

    @Column()
    inversor: string;

    @ManyToOne(() => Panel, panel => panel.prices)
    @JoinColumn({ name: 'panel_id' })
    panel: Panel;
}