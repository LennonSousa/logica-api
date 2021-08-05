import { EntityRepository, Repository } from 'typeorm';

import PayTypesModel from '../models/PayTypesModel';

@EntityRepository(PayTypesModel)
class PayTypesRepository extends Repository<PayTypesModel> { }

export { PayTypesRepository };