import ProjectAttachment from '../models/ProjectAttachmentsModel';
import projectView from './projectView';

export default {
    render(projectAttachment: ProjectAttachment) {
        return {
            id: projectAttachment.id,
            name: projectAttachment.name,
            path: projectAttachment.path,
            received_at: projectAttachment.received_at,
            project: projectAttachment.project && projectView.render(projectAttachment.project),
        }
    },

    renderMany(projectEvents: ProjectAttachment[]) {
        return projectEvents.map(projectEvent => this.render(projectEvent));
    }
}