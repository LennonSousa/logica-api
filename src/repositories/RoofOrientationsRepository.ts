import { EntityRepository, Repository } from 'typeorm';

import RoofOrientationsModel from '../models/RoofOrientationsModel';

@EntityRepository(RoofOrientationsModel)
class RoofOrientationsRepository extends Repository<RoofOrientationsModel> { }

export { RoofOrientationsRepository };