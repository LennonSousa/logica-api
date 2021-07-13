import { EntityRepository, Repository } from 'typeorm';

import EstimateItemsModel from '../models/EstimateItemsModel';

@EntityRepository(EstimateItemsModel)
class EstimateItemsRepository extends Repository<EstimateItemsModel> { }

export { EstimateItemsRepository };