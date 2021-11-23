import { EntityRepository, Repository } from 'typeorm';

import NoteAttachmentsModel from '../models/NoteAttachmentsModel';

@EntityRepository(NoteAttachmentsModel)
class NoteAttachmentsRepository extends Repository<NoteAttachmentsModel> { }

export { NoteAttachmentsRepository };