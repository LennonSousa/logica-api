import NoteAttachment from '../models/NoteAttachmentsModel';
import noteView from './noteView';

export default {
    render(attachment: NoteAttachment) {
        return {
            id: attachment.id,
            title: attachment.title,
            path: attachment.path,
            note: attachment.note && noteView.render(attachment.note),
        }
    },

    renderDownload(noteAttachment: NoteAttachment) {
        return {
            path: `${process.env.UPLOADS_DIR}/notes/${noteAttachment.note.id}/${noteAttachment.path}`,
        }
    },

    renderMany(attachments: NoteAttachment[]) {
        return attachments.map(attachment => this.render(attachment));
    }
}