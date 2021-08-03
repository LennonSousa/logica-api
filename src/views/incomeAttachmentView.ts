import IncomeAttachments from '../models/IncomeAttachmentsModel';
import incomeView from './incomeView';

export default {
    render(incomeAttachment: IncomeAttachments) {
        return {
            id: incomeAttachment.id,
            name: incomeAttachment.name,
            path: incomeAttachment.path,
            received_at: incomeAttachment.received_at,
            income: incomeAttachment.income && incomeView.render(incomeAttachment.income),
        }
    },

    renderMany(incomeAttachments: IncomeAttachments[]) {
        return incomeAttachments.map(incomeAttachment => this.render(incomeAttachment));
    }
}