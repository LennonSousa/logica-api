import AttachmentsRequiredProject from '../models/AttachmentsRequiredProjectModel';
import projectAttachmentRequiredView from './projectAttachmentRequiredView';

export default {
    render(attachmentRequired: AttachmentsRequiredProject) {
        return {
            id: attachmentRequired.id,
            description: attachmentRequired.description,
            order: attachmentRequired.order,
            active: attachmentRequired.active,
            attachments: attachmentRequired.attachments ? projectAttachmentRequiredView.renderMany(attachmentRequired.attachments) : [],
        }
    },

    renderMany(attachmentRequireds: AttachmentsRequiredProject[]) {
        return attachmentRequireds.map(attachmentRequired => this.render(attachmentRequired));
    }
}