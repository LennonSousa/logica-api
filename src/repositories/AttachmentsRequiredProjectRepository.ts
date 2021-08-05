import { EntityRepository, Repository } from 'typeorm';

import AttachmentsRequiredProjectModel from '../models/AttachmentsRequiredProjectModel';

@EntityRepository(AttachmentsRequiredProjectModel)
class AttachmentsRequiredProjectRepository extends Repository<AttachmentsRequiredProjectModel> { }

export { AttachmentsRequiredProjectRepository };