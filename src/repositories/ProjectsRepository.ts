import { EntityRepository, Repository } from 'typeorm';

import ProjectsModel from '../models/ProjectsModel';

@EntityRepository(ProjectsModel)
class ProjectsRepository extends Repository<ProjectsModel> { }

export { ProjectsRepository };