import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifications')
export default class NotificationsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    recipients: string;

    @Column()
    group: string;

    @Column({ name: 'stage_id' })
    stageId: string;
}