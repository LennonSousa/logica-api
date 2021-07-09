import Role from '../models/UsersRolesModel';

export default {
    render(role: Role) {
        return {
            id: role.id,
            role: role.role,
            view: role.view,
            view_self: role.view_self,
            create: role.create,
            update: role.update,
            update_self: role.update_self,
            remove: role.remove,
        }
    },

    renderMany(roles: Role[]) {
        return roles.map(role => this.render(role));
    }
}