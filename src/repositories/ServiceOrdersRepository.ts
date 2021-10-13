import { EntityRepository, Repository } from 'typeorm';

import ServiceOrdersModel from '../models/ServiceOrdersModel';

@EntityRepository(ServiceOrdersModel)
class ServiceOrdersRepository extends Repository<ServiceOrdersModel> { }

export { ServiceOrdersRepository };