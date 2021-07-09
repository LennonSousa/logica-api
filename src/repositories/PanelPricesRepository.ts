import { EntityRepository, Repository } from 'typeorm';

import PanelPricesModel from '../models/PanelPricesModel';

@EntityRepository(PanelPricesModel)
class PanelPricesRepository extends Repository<PanelPricesModel> { }

export { PanelPricesRepository };