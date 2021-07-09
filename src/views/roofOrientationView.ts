import RoofOrientation from '../models/RoofOrientationsModel';
import estimateView from './estimateView';

export default {
    render(roofOrientation: RoofOrientation) {
        return {
            id: roofOrientation.id,
            name: roofOrientation.name,
            increment: roofOrientation.increment,
            order: roofOrientation.order,
            estimates: roofOrientation.estimates ? estimateView.renderMany(roofOrientation.estimates) : [],
        }
    },

    renderMany(roofOrientations: RoofOrientation[]) {
        return roofOrientations.map(roofOrientation => this.render(roofOrientation));
    }
}