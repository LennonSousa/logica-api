import IncomeItem from '../models/IncomeItemsModel';
import incomeView from './incomeView';

export default {
    render(incomeItem: IncomeItem) {
        return {
            id: incomeItem.id,
            description: incomeItem.description,
            value: incomeItem.value,
            is_paid: incomeItem.is_paid,
            received_at: incomeItem.received_at,
            income: incomeItem.income && incomeView.render(incomeItem.income),
        }
    },

    renderMany(incomeItems: IncomeItem[]) {
        return incomeItems.map(incomeItem => this.render(incomeItem));
    }
}