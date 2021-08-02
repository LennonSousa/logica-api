import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Event from './EventsProjectModel';
import Project from './ProjectsModel';

@Entity('project_events')
export default class ProjectEventsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    notes: string;

    @Column()
    done: boolean;

    @Column()
    done_at: Date;

    @ManyToOne(() => Event, event => event.events)
    @JoinColumn({ name: 'event_id' })
    event: Event;

    @ManyToOne(() => Project, project => project.events)
    @JoinColumn({ name: 'project_id' })
    project: Project;
}