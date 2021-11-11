import Income from '../models/IncomingsModel';
import storeView from './storeView';
import projectView from './projectView';
import payTypeView from './payTypeView';
import incomeItemView from './incomeItemView';
import incomeAttachmentView from './incomeAttachmentView';

export default {
    render(income: Income) {
        return {
            id: income.id,
            description: income.description,
            value: income.value,
            created_at: income.created_at,
            created_by: income.created_by,
            store: income.store && storeView.render(income.store),
            project: income.project && projectView.render(income.project),
            payType: income.payType && payTypeView.render(income.payType),
            items: income.items ? incomeItemView.renderMany(income.items) : [],
            attachments: income.attachments ? incomeAttachmentView.renderMany(income.attachments) : [],
        }
    },

    renderMany(incomes: Income[]) {
        return incomes.map(income => this.render(income));
    }
}