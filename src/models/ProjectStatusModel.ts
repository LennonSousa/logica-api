import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Estimate from './EstimatesModel';

@Entity('project_status')
export default class ProjectStatusModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @OneToMany(() => Estimate, estimate => estimate.status)
    @JoinColumn({ name: 'status_id' })
    estimates: Estimate[];
}