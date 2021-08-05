import { EntityRepository, Repository } from 'typeorm';

import IncomeItemsModel from '../models/IncomeItemsModel';

@EntityRepository(IncomeItemsModel)
class IncomeItemsRepository extends Repository<IncomeItemsModel> { }

export { IncomeItemsRepository };