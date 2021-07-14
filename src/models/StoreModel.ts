import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('store')
export default class StoreModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    title: string;

    @Column()
    name: string;

    @Column()
    avatar: string;

    @Column()
    phone: string;

    @Column()
    description: string;

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
    document: string;

    @Column()
    services_in: string;

    @Column()
    warranty: string;

    @Column()
    engineer: string;
}