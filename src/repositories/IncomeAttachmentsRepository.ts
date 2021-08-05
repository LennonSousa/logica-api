import { EntityRepository, Repository } from 'typeorm';

import IncomeAttachmentsModel from '../models/IncomeAttachmentsModel';

@EntityRepository(IncomeAttachmentsModel)
class IncomeAttachmentsRepository extends Repository<IncomeAttachmentsModel> { }

export { IncomeAttachmentsRepository };