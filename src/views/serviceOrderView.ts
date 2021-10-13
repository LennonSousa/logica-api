import ServiceOrder from '../models/ServiceOrdersModel';
import projectView from './projectView';

export default {
    render(serviceOrder: ServiceOrder) {
        return {
            id: serviceOrder.id,
            customer: serviceOrder.customer,
            document: serviceOrder.document,
            phone: serviceOrder.phone,
            cellphone: serviceOrder.cellphone,
            contacts: serviceOrder.contacts,
            email: serviceOrder.email,
            zip_code: serviceOrder.zip_code,
            street: serviceOrder.street,
            number: serviceOrder.number,
            neighborhood: serviceOrder.neighborhood,
            complement: serviceOrder.complement,
            city: serviceOrder.city,
            state: serviceOrder.state,
            coordinates: serviceOrder.coordinates,
            wifi_name: serviceOrder.wifi_name,
            wifi_password: serviceOrder.wifi_password,
            roof_details: serviceOrder.roof_details,
            electric_type: serviceOrder.electric_type,
            inversor_brand: serviceOrder.inversor_brand,
            inversor_potency: serviceOrder.inversor_potency,
            module_brand: serviceOrder.module_brand,
            module_amount: serviceOrder.module_amount,
            test_leak: serviceOrder.test_leak,
            test_meter: serviceOrder.test_meter,
            test_monitor: serviceOrder.test_monitor,
            explanation: serviceOrder.explanation,
            technical: serviceOrder.technical,
            start_at: serviceOrder.start_at,
            finish_at: serviceOrder.finish_at,
            project: serviceOrder.project && projectView.render(serviceOrder.project),
        }
    },

    renderMany(serviceOrders: ServiceOrder[]) {
        return serviceOrders.map(serviceOrder => this.render(serviceOrder));
    }
}