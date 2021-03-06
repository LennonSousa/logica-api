import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import noteShareView from '../views/noteShareView';
import { NoteSharesRepository } from '../repositories/NoteSharesRepository';

export default {
    async create(request: Request, response: Response) {
        const {
            can_edit,
            note,
            user,
        } = request.body;

        const noteSharesRepository = getCustomRepository(NoteSharesRepository);

        const data = {
            can_edit,
            note,
            user,
        };

        const schema = Yup.object().shape({
            can_edit: Yup.string().notRequired(),
            note: Yup.string().required(),
            user: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const noteShare = noteSharesRepository.create(data);

        await noteSharesRepository.save(noteShare);

        return response.status(201).json(noteShareView.render(noteShare));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            can_edit,
        } = request.body;

        const noteSharesRepository = getCustomRepository(NoteSharesRepository);


        const data = {
            can_edit,
        };

        const schema = Yup.object().shape({
            can_edit: Yup.string().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const noteShares = noteSharesRepository.create(data);

        await noteSharesRepository.update(id, noteShares);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const noteSharesRepository = getCustomRepository(NoteSharesRepository);

        await noteSharesRepository.delete(id);

        return response.status(204).send();
    }
}