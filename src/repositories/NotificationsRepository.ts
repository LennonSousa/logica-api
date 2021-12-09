import { EntityRepository, Repository } from 'typeorm';

import NotificationsModel from '../models/NotificationsModel';

@EntityRepository(NotificationsModel)
class NotificationsRepository extends Repository<NotificationsModel> { }

export { NotificationsRepository };