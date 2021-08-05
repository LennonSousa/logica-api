import { EntityRepository, Repository } from 'typeorm';

import ProjectStatusModel from '../models/ProjectStatusModel';

@EntityRepository(ProjectStatusModel)
class ProjectStatusRepository extends Repository<ProjectStatusModel> { }

export { ProjectStatusRepository };