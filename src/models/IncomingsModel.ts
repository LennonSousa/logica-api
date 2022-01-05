import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Store from './StoresModel';
import Project from './ProjectsModel';
import PayType from './PayTypesModel';
import IncomeItem from './IncomeItemsModel';
import Attachment from './IncomeAttachmentsModel';

@Entity('incomings')
export default class IncomingsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    description: string;

    @Column()
    value: number;

    @Column()
    created_at: Date;

    @Column()
    created_by: string;

    @ManyToOne(() => Store, store => store.incomings)
    @JoinColumn({ name: 'store_id' })
    store: Store;

    @ManyToOne(() => Project, project => project.incomings)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @ManyToOne(() => PayType, payType => payType.incomings)
    @JoinColumn({ name: 'pay_type_id' })
    payType: PayType;

    @OneToMany(() => IncomeItem, incomeItem => incomeItem.income, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'income_id' })
    items: IncomeItem[];

    @OneToMany(() => Attachment, attachment => attachment.income)
    @JoinColumn({ name: 'income_id' })
    attachments: Attachment[];
}