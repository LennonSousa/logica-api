import ProjectEvent from '../models/ProjectEventsModel';
import eventProjectView from './eventProjectView';
import projectView from './projectView';

export default {
    render(eventProject: ProjectEvent) {
        return {
            id: eventProject.id,
            notes: eventProject.notes,
            done: eventProject.done,
            done_at: eventProject.done_at,
            event: eventProject.event && eventProjectView.render(eventProject.event),
            project: eventProject.project && projectView.render(eventProject.project),
        }
    },

    renderMany(projectEvents: ProjectEvent[]) {
        return projectEvents.map(projectEvent => this.render(projectEvent));
    }
}