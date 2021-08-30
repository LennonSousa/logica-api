import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import AttachmentRequired from './AttachmentsRequiredProjectModel';
import Project from './ProjectsModel';

@Entity('project_attachments_required')
export default class ProjectAttachmentsRequiredModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    path: string;

    @Column()
    received_at: Date;

    @ManyToOne(() => AttachmentRequired, attachmentRequired => attachmentRequired.attachments)
    @JoinColumn({ name: 'attachment_id' })
    attachmentRequired: AttachmentRequired;

    @ManyToOne(() => Project, project => project.attachmentsRequired)
    @JoinColumn({ name: 'project_id' })
    project: Project;
}