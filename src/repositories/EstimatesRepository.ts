import { EntityRepository, Repository } from 'typeorm';

import EstimatesModel from '../models/EstimatesModel';

@EntityRepository(EstimatesModel)
class EstimatesRepository extends Repository<EstimatesModel> { }

export { EstimatesRepository };