import PayType from '../models/PayTypesModel';
import incomeView from './incomeView';

export default {
    render(payType: PayType) {
        return {
            id: payType.id,
            name: payType.name,
            order: payType.order,
            active: payType.active,
            incomings: payType.incomings ? incomeView.renderMany(payType.incomings) : [],
        }
    },

    renderMany(payTypes: PayType[]) {
        return payTypes.map(payType => this.render(payType));
    }
}