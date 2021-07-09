import { EntityRepository, Repository } from 'typeorm';

import StoreModel from '../models/StoreModel';

@EntityRepository(StoreModel)
class StoreRepository extends Repository<StoreModel> { }

export { StoreRepository };