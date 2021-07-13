import Estimate from '../models/EstimatesModel';
import userView from './userView';
import panelView from './panelView';
import roofOrientationView from './roofOrientationView';
import roofTypeView from './roofTypeView';
import statusView from './estimateStatusView';
import itemView from './estimateItemView';

export default {
    render(estimate: Estimate) {
        return {
            id: estimate.id,
            customer: estimate.customer,
            document: estimate.document,
            phone: estimate.phone,
            cellphone: estimate.cellphone,
            contacts: estimate.contacts,
            email: estimate.email,
            zip_code: estimate.zip_code,
            street: estimate.street,
            number: estimate.number,
            neighborhood: estimate.neighborhood,
            complement: estimate.complement,
            city: estimate.city,
            state: estimate.state,
            energy_company: estimate.energy_company,
            unity: estimate.unity,
            kwh: estimate.kwh,
            irradiation: estimate.irradiation,
            month_01: estimate.month_01,
            month_02: estimate.month_02,
            month_03: estimate.month_03,
            month_04: estimate.month_04,
            month_05: estimate.month_05,
            month_06: estimate.month_06,
            month_07: estimate.month_07,
            month_08: estimate.month_08,
            month_09: estimate.month_09,
            month_10: estimate.month_10,
            month_11: estimate.month_11,
            month_12: estimate.month_12,
            month_13: estimate.month_13,
            average_increase: estimate.average_increase,
            discount: estimate.discount,
            increase: estimate.increase,
            percent: estimate.percent,
            show_values: estimate.show_values,
            show_discount: estimate.show_discount,
            notes: estimate.notes,
            created_by: estimate.created_by,
            created_at: estimate.created_at,
            updated_by: estimate.updated_by,
            updated_at: estimate.updated_at,
            user: estimate.user && userView.render(estimate.user),
            panel: estimate.panel && panelView.render(estimate.panel),
            roof_orientation: estimate.roof_orientation && roofOrientationView.render(estimate.roof_orientation),
            roof_type: estimate.roof_type && roofTypeView.render(estimate.roof_type),
            status: estimate.status && statusView.render(estimate.status),
            items: !!estimate.items.length ? itemView.renderMany(estimate.items) : [],
        }
    },

    renderMany(estimates: Estimate[]) {
        return estimates.map(estimate => this.render(estimate));
    }
}