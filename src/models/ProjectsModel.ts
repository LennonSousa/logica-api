import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import User from './UsersModel';
import Store from './StoresModel';
import ProjectStatus from './ProjectStatusModel';
import Event from './ProjectEventsModel';
import AttachmentRequired from './ProjectAttachmentsRequiredModel';
import Attachment from './ProjectAttachmentsModel';
import Income from './IncomingsModel';
import ServiceOrder from './ServiceOrdersModel';

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
    energy_company: string;

    @Column()
    unity: string;

    @Column()
    months_average: number;

    @Column()
    average_increase: number;

    @Column()
    coordinates: string;

    @Column()
    capacity: number;

    @Column()
    inversor: string;

    @Column()
    roof_orientation: string;

    @Column()
    roof_type: string;

    @Column()
    panel: string;

    @Column()
    panel_amount: number;

    @Column()
    price: number;

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
    seller: User;

    @ManyToOne(() => Store, store => store.projects)
    @JoinColumn({ name: 'store_id' })
    store: Store;

    @ManyToOne(() => ProjectStatus, projectStatus => projectStatus.projects)
    @JoinColumn({ name: 'status_id' })
    status: ProjectStatus;

    @OneToMany(() => Event, event => event.project, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'project_id' })
    events: Event[];

    @OneToMany(() => AttachmentRequired, attachmentRequired => attachmentRequired.project)
    @JoinColumn({ name: 'project_id' })
    attachmentsRequired: AttachmentRequired[];

    @OneToMany(() => Attachment, attachment => attachment.project)
    @JoinColumn({ name: 'project_id' })
    attachments: Attachment[];

    @OneToMany(() => Income, incomeAttachmentView => incomeAttachmentView.project, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'project_id' })
    incomings: Income[];

    @OneToMany(() => ServiceOrder, serviceOrder => serviceOrder.project)
    @JoinColumn({ name: 'project_id' })
    serviceOrders: ServiceOrder[];
}