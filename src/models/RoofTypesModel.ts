import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Estimate from './EstimatesModel';

@Entity('roof_types')
export default class RoofTypesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @OneToMany(() => Estimate, estimate => estimate.roof_type)
    @JoinColumn({ name: 'roof_type_id' })
    estimates: Estimate[];
}