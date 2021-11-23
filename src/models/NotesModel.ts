import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Store from './StoresModel';
import Share from './NoteSharesModel';
import Attachment from './NoteAttachmentsModel';

@Entity('notes')
export default class NotesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    created_by: string;

    @Column()
    created_at: Date;

    @Column()
    updated_by: string;

    @Column()
    updated_at: Date;

    @Column()
    store_only: boolean;

    @ManyToOne(() => Store)
    @JoinColumn({ name: 'store_id' })
    store: Store;

    @OneToMany(() => Share, share => share.note, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'note_id' })
    shares: Share[];

    @OneToMany(() => Attachment, attachment => attachment.note)
    @JoinColumn({ name: 'note_id' })
    attachments: Attachment[];
}