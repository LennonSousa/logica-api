import { EntityRepository, Repository } from 'typeorm';

import UsersModel from '../models/UsersModel';

@EntityRepository(UsersModel)
class UsersRepository extends Repository<UsersModel> { }

export { UsersRepository };