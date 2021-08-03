import ProjectAttachmentRequired from '../models/ProjectAttachmentsRequiredModel';
import attachmentRequiredProjectView from './attachmentRequiredProjectView';
import projectView from './projectView';

export default {
    render(projectAttachment: ProjectAttachmentRequired) {
        return {
            id: projectAttachment.id,
            name: projectAttachment.name,
            path: projectAttachment.path,
            received_at: projectAttachment.received_at,
            attachmentRequired: projectAttachment.attachmentRequired && attachmentRequiredProjectView.render(projectAttachment.attachmentRequired),
            project: projectAttachment.project && projectView.render(projectAttachment.project),
        }
    },

    renderMany(projectAttachments: ProjectAttachmentRequired[]) {
        return projectAttachments.map(projectAttachment => this.render(projectAttachment));
    }
}