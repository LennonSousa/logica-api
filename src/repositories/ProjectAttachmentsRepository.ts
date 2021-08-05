import { EntityRepository, Repository } from 'typeorm';

import ProjectAttachmentsModel from '../models/ProjectAttachmentsModel';

@EntityRepository(ProjectAttachmentsModel)
class ProjectAttachmentsRepository extends Repository<ProjectAttachmentsModel> { }

export { ProjectAttachmentsRepository };