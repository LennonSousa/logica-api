import User from '../models/UsersModel';
import storeView from './storeView';
import userRoleView from './userRoleView';

export default {
    render(user: User) {
        return {
            id: user.id,
            name: user.name,
            document: user.document,
            phone: user.phone,
            email: user.email,
            active: user.active,
            paused: user.paused,
            root: user.root,
            store_only: user.store_only,
            discountLimit: user.discountLimit,
            store: user.store && storeView.render(user.store),
            created_at: user.created_at,
            roles: user.roles ? userRoleView.renderMany(user.roles) : [],
        }
    },

    renderMany(users: User[]) {
        return users.map(user => this.render(user));
    }
}