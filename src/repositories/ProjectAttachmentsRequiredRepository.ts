import { EntityRepository, Repository } from 'typeorm';

import ProjectAttachmentsRequiredModel from '../models/ProjectAttachmentsRequiredModel';

@EntityRepository(ProjectAttachmentsRequiredModel)
class ProjectAttachmentsRequiredRepository extends Repository<ProjectAttachmentsRequiredModel> { }

export { ProjectAttachmentsRequiredRepository };