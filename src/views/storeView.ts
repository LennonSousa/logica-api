import Store from '../models/StoresModel';
import userView from './userView';

export default {
    render(store: Store) {
        return {
            id: store.id,
            title: store.title,
            name: store.name,
            avatar: `${process.env.HOST_API}/${process.env.UPLOADS_DIR}/stores/${store.avatar}`,
            phone: store.phone,
            description: store.description,
            email: store.email,
            zip_code: store.zip_code,
            street: store.street,
            number: store.number,
            neighborhood: store.neighborhood,
            complement: store.complement,
            city: store.city,
            state: store.state,
            document: store.document,
            services_in: store.services_in,
            warranty: store.warranty,
            engineer: store.engineer,
            bank_account: store.bank_account,
            active: store.active,
            users: store.users ? userView.renderMany(store.users) : [],
        }
    },

    renderMany(stores: Store[]) {
        return stores.map(store => this.render(store));
    }
}