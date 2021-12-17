import { EntityRepository, Repository } from 'typeorm';

import ProjectItemsModel from '../models/ProjectItemsModel';

@EntityRepository(ProjectItemsModel)
class ProjectItemsRepository extends Repository<ProjectItemsModel> { }

export { ProjectItemsRepository };