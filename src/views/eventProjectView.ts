import EventsProject from '../models/EventsProjectModel';
import projectEventView from './projectEventView';

export default {
    render(eventProject: EventsProject) {
        return {
            id: eventProject.id,
            description: eventProject.description,
            order: eventProject.order,
            active: eventProject.active,
            events: eventProject.events ? projectEventView.renderMany(eventProject.events) : [],
        }
    },

    renderMany(eventProjects: EventsProject[]) {
        return eventProjects.map(eventProject => this.render(eventProject));
    }
}