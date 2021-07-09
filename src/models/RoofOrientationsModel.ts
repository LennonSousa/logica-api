import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Estimate from './EstimatesModel';

@Entity('roof_orientations')
export default class RoofOrientationsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    increment: number;

    @Column()
    order: number;

    @OneToMany(() => Estimate, estimate => estimate.roof_orientation)
    @JoinColumn({ name: 'roof_orientation_id' })
    estimates: Estimate[];
}