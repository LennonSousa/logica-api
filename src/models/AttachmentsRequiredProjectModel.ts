import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Attachment from './ProjectAttachmentsRequiredModel';

@Entity('attachments_required_project')
export default class AttachmentsRequiredProjectModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    description: string;

    @Column()
    order: number;

    @Column()
    active: boolean;

    @OneToMany(() => Attachment, attachment => attachment.attachmentRequired)
    @JoinColumn({ name: 'attachment_id' })
    attachments: Attachment[];
}