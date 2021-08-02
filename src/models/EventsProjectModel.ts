import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Event from './ProjectEventsModel';

@Entity('events_project')
export default class EventsProjectModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    description: string;

    @Column()
    order: number;

    @Column()
    active: boolean;

    @OneToMany(() => Event, event => event.event)
    @JoinColumn({ name: 'event_id' })
    events: Event[];
}