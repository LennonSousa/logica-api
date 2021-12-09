import Notification from '../models/NotificationsModel';

export default {
    render(notification: Notification) {
        return {
            id: notification.id,
            recipients: JSON.parse(notification.recipients),
            group: notification.group,
            stageId: notification.stageId,
        }
    },

    renderMany(notifications: Notification[]) {
        return notifications.map(notification => this.render(notification));
    }
}