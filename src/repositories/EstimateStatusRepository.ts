import { EntityRepository, Repository } from 'typeorm';

import EstimateStatusModel from '../models/EstimateStatusModel';

@EntityRepository(EstimateStatusModel)
class EstimateStatusRepository extends Repository<EstimateStatusModel> { }

export { EstimateStatusRepository };