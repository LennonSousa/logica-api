import RoofType from '../models/RoofTypesModel';
import estimateView from './estimateView';

export default {
    render(roofType: RoofType) {
        return {
            id: roofType.id,
            name: roofType.name,
            order: roofType.order,
            estimates: roofType.estimates ? estimateView.renderMany(roofType.estimates) : [],
        }
    },

    renderMany(roofTypes: RoofType[]) {
        return roofTypes.map(roofType => this.render(roofType));
    }
}