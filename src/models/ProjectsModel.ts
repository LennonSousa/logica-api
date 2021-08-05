import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import User from './UsersModel';
import ProjectStatus from './ProjectStatusModel';
import Event from './ProjectEventsModel';
import AttachmentRequired from './ProjectAttachmentsRequiredModel';
import Attachment from './ProjectAttachmentsModel';

@Entity('projects')
export default class ProjectsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    customer: string;

    @Column()
    document: string;

    @Column()
    phone: string;

    @Column()
    cellphone: string;

    @Column()
    contacts: string;

    @Column()
    email: string;

    @Column()
    zip_code: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    neighborhood: string;

    @Column()
    complement: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    coordinates: string;

    @Column()
    capacity: string;

    @Column()
    inversor: string;

    @Column()
    roof_orientation: string;

    @Column()
    roof_type: string;

    @Column()
    price: number;

    @Column()
    seler: string;

    @Column()
    notes: string;

    @Column()
    financier_same: boolean;

    @Column()
    financier: string;

    @Column()
    financier_document: string;

    @Column()
    financier_rg: string;

    @Column()
    financier_cellphone: string;

    @Column()
    financier_email: string;

    @Column()
    financier_zip_code: string;

    @Column()
    financier_street: string;

    @Column()
    financier_number: string;

    @Column()
    financier_neighborhood: string;

    @Column()
    financier_complement: string;

    @Column()
    financier_city: string;

    @Column()
    financier_state: string;

    @Column()
    created_by: string;

    @Column()
    created_at: Date;

    @Column()
    updated_by: string;

    @Column()
    updated_at: Date;

    @ManyToOne(() => User, user => user.estimates)
    @JoinColumn({ name: 'seller_id' })
    seller_id: User;

    @ManyToOne(() => ProjectStatus, projectStatus => projectStatus.projects)
    @JoinColumn({ name: 'status_id' })
    status: ProjectStatus;

    @OneToMany(() => Event, event => event.project)
    @JoinColumn({ name: 'project_id' })
    events: Event[];

    @OneToMany(() => AttachmentRequired, attachmentRequired => attachmentRequired.project)
    @JoinColumn({ name: 'project_id' })
    attachmentsRequired: AttachmentRequired[];

    @OneToMany(() => Attachment, attachment => attachment.project)
    @JoinColumn({ name: 'project_id' })
    attachments: Attachment[];
}