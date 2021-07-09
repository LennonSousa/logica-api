import Panel from '../models/PanelsModel';
import panelPriceView from './panelPriceView';
import estimateView from './estimateView';

export default {
    render(panel: Panel) {
        return {
            id: panel.id,
            name: panel.name,
            capacity: panel.capacity,
            paused: panel.paused,
            order: panel.order,
            prices: panel.prices ? panelPriceView.renderMany(panel.prices) : [],
            estimates: panel.estimates ? estimateView.renderMany(panel.estimates) : [],
        }
    },

    renderMany(panels: Panel[]) {
        return panels.map(panel => this.render(panel));
    }
}