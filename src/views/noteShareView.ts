import NoteShare from '../models/NoteSharesModel';
import noteView from './noteView';
import userView from './userView';

export default {
    render(share: NoteShare) {
        return {
            id: share.id,
            can_edit: share.can_edit,
            note: share.note && noteView.render(share.note),
            user: share.user && userView.render(share.user),
        }
    },

    renderMany(shares: NoteShare[]) {
        return shares.map(share => this.render(share));
    }
}