import EstimateStatus from '../models/EstimateStatusModel';
import estimateView from './estimateView';

export default {
    render(status: EstimateStatus) {
        return {
            id: status.id,
            name: status.name,
            order: status.order,
            estimates: status.estimates ? estimateView.renderMany(status.estimates) : [],
        }
    },

    renderMany(status: EstimateStatus[]) {
        return status.map(statusItem => this.render(statusItem));
    }
}