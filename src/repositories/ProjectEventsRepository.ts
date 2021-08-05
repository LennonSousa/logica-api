import { EntityRepository, Repository } from 'typeorm';

import ProjectEventsModel from '../models/ProjectEventsModel';

@EntityRepository(ProjectEventsModel)
class ProjectEventsRepository extends Repository<ProjectEventsModel> { }

export { ProjectEventsRepository };