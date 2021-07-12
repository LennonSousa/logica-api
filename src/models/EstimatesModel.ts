import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Panel from './PanelsModel';
import User from './UsersModel';
import RoofOrientation from './RoofOrientationsModel';
import RoofType from './RoofTypesModel';
import EstimateStatus from './EstimateStatusModel';

@Entity('licensings')
export default class EstimatesModel {
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
    kwh: number;

    @Column()
    irradiation: number;

    @Column()
    month_01: number;

    @Column()
    month_02: number;

    @Column()
    month_03: number;

    @Column()
    month_04: number;

    @Column()
    month_05: number;

    @Column()
    month_06: number;

    @Column()
    month_07: number;

    @Column()
    month_08: number;

    @Column()
    month_09: number;

    @Column()
    month_10: number;

    @Column()
    month_11: number;

    @Column()
    month_12: number;

    @Column()
    month_13: number;

    @Column()
    average_increase: number;

    @Column()
    discount: number;

    @Column()
    increase: number;

    @Column()
    percent: boolean;

    @Column()
    show_values: boolean;

    @Column()
    show_discount: boolean;

    @Column()
    notes: string;

    @Column()
    created_by: string;

    @Column()
    created_at: Date;

    @Column()
    updated_by: string;

    @Column()
    updated_at: Date;

    @ManyToOne(() => User, user => user.estimates)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Panel, panel => panel.estimates)
    @JoinColumn({ name: 'panel_id' })
    panel: Panel;

    @ManyToOne(() => RoofOrientation, roofOrientation => roofOrientation.estimates)
    @JoinColumn({ name: 'roof_orientation_id' })
    roof_orientation: RoofOrientation;

    @ManyToOne(() => RoofType, roofType => roofType.estimates)
    @JoinColumn({ name: 'roof_type_id' })
    roof_type: RoofType;

    @ManyToOne(() => EstimateStatus, estimateStatus => estimateStatus.estimates)
    @JoinColumn({ name: 'status_id' })
    status: EstimateStatus;
}