import { EntityRepository, Repository } from 'typeorm';

import UsersRolesModel from '../models/UsersRolesModel';

@EntityRepository(UsersRolesModel)
class UsersRolesRepository extends Repository<UsersRolesModel> { }

export { UsersRolesRepository };