import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Note from './NotesModel';

@Entity('note_attachments')
export default class NoteAttachmentsModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    title: string;

    @Column()
    path: string;

    @ManyToOne(() => Note, note => note.attachments)
    @JoinColumn({ name: 'note_id' })
    note: Note;
}