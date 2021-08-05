import { EntityRepository, Repository } from 'typeorm';

import EventsProjectModel from '../models/EventsProjectModel';

@EntityRepository(EventsProjectModel)
class EventsProjectRepository extends Repository<EventsProjectModel> { }

export { EventsProjectRepository };