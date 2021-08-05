import { EntityRepository, Repository } from 'typeorm';

import IncomingsModel from '../models/IncomingsModel';

@EntityRepository(IncomingsModel)
class IncomingsRepository extends Repository<IncomingsModel> { }

export { IncomingsRepository };