import Note from '../models/NotesModel';
import storeView from './storeView';
import noteShareView from './noteShareView';
import noteAttachmentView from './noteAttachmentView';

export default {
    render(note: Note) {
        return {
            id: note.id,
            title: note.title,
            text: note.text,
            created_by: note.created_by,
            created_at: note.created_at,
            updated_by: note.updated_by,
            updated_at: note.updated_at,
            store: note.store && storeView.render(note.store),
            shares: note.shares ? noteShareView.renderMany(note.shares) : [],
            attachmetns: note.attachments ? noteAttachmentView.renderMany(note.attachments) : [],
        }
    },

    renderMany(notes: Note[]) {
        return notes.map(note => this.render(note));
    }
}