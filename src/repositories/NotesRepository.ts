import { EntityRepository, Repository } from 'typeorm';

import NotesModel from '../models/NotesModel';

@EntityRepository(NotesModel)
class NotesRepository extends Repository<NotesModel> { }

export { NotesRepository };