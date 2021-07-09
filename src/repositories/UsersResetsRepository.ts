import { EntityRepository, Repository } from 'typeorm';

import UsersResetsModel from '../models/UsersResetsModel';

@EntityRepository(UsersResetsModel)
class UsersResetsRepository extends Repository<UsersResetsModel> { }

export { UsersResetsRepository };