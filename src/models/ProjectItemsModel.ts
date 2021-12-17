import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Project from './ProjectsModel';

@Entity('project_items')
export default class ProjectItemsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    amount: number;

    @Column()
    price: number;

    @Column()
    percent: number;

    @Column()
    order: number;

    @ManyToOne(() => Project, project => project.items)
    @JoinColumn({ name: 'project_id' })
    project: Project;
}