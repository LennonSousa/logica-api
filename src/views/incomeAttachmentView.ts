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

    renderDownload(incomeAttachment: IncomeAttachments) {
        return {
            path: `${process.env.UPLOADS_DIR}/incomings/${incomeAttachment.income.id}/${incomeAttachment.path}`,
        }
    },

    renderMany(incomeAttachments: IncomeAttachments[]) {
        return incomeAttachments.map(incomeAttachment => this.render(incomeAttachment));
    }
}