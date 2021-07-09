import { EntityRepository, Repository } from 'typeorm';

import PanelsModel from '../models/PanelsModel';

@EntityRepository(PanelsModel)
class PanelsRepository extends Repository<PanelsModel> { }

export { PanelsRepository };