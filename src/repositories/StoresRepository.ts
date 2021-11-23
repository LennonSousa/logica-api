import { EntityRepository, Repository } from 'typeorm';

import StoresModel from '../models/StoresModel';

@EntityRepository(StoresModel)
class StoresRepository extends Repository<StoresModel> { }

export { StoresRepository };