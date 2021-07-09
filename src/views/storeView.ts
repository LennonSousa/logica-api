import Store from '../models/StoreModel';

export default {
    render(store: Store) {
        return {
            id: store.id,
            title: store.title,
            avatar: `${process.env.HOST_API}/uploads/store/${store.avatar}`,
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
        }
    },
}