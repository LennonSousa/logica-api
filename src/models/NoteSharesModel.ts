import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Note from './NotesModel';
import User from './UsersModel';

@Entity('note_shares')
export default class NoteSharesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    can_edit: boolean;

    @ManyToOne(() => Note, note => note.shares)
    @JoinColumn({ name: 'note_id' })
    note: Note;

    @ManyToOne(() => User, user => user.notes)
    @JoinColumn({ name: 'user_id' })
    user: User;
}