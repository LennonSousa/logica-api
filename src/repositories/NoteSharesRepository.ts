import { EntityRepository, Repository } from 'typeorm';

import NoteSharesModel from '../models/NoteSharesModel';

@EntityRepository(NoteSharesModel)
class NoteSharesRepository extends Repository<NoteSharesModel> { }

export { NoteSharesRepository };