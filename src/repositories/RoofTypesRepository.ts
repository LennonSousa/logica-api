import { EntityRepository, Repository } from 'typeorm';

import RoofTypesModel from '../models/RoofTypesModel';

@EntityRepository(RoofTypesModel)
class RoofTypesRepository extends Repository<RoofTypesModel> { }

export { RoofTypesRepository };