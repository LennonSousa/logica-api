import ProjectStatus from '../models/ProjectStatusModel';
import projectView from './projectView';

export default {
    render(status: ProjectStatus) {
        return {
            id: status.id,
            name: status.name,
            order: status.order,
            projects: status.projects ? projectView.renderMany(status.projects) : [],
        }
    },

    renderMany(status: ProjectStatus[]) {
        return status.map(statusItem => this.render(statusItem));
    }
}