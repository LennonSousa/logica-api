import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Project from './ProjectsModel';

@Entity('project_status')
export default class ProjectStatusModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    order: number;

    @OneToMany(() => Project, project => project.status)
    @JoinColumn({ name: 'status_id' })
    projects: Project[];
}