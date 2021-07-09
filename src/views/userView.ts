import User from '../models/UsersModel';
import userRoleView from './userRoleView';

export default {
    render(user: User) {
        return {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            active: user.active,
            paused: user.paused,
            sudo: user.sudo,
            created_at: user.created_at,
            roles: user.roles ? userRoleView.renderMany(user.roles) : [],
        }
    },

    renderMany(users: User[]) {
        return users.map(user => this.render(user));
    }
}