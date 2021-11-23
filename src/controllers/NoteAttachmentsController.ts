import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import noteAttachmentView from '../views/noteAttachmentView';
import { NoteAttachmentsRepository } from '../repositories/NoteAttachmentsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "notes", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            title,
            note,
        } = request.body;

        const noteAttachmentsRepository = getCustomRepository(NoteAttachmentsRepository);

        const file = request.file as Express.Multer.File;

        const data = {
            title,
            path: file.filename,
            note,
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            path: Yup.string().required(),
            note: Yup.string().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const noteAttachment = noteAttachmentsRepository.create(data);

        await noteAttachmentsRepository.save(noteAttachment);

        return response.status(201).json(noteAttachmentView.render(noteAttachment));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "notes", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            title,
        } = request.body;

        const noteAttachmentsRepository = getCustomRepository(NoteAttachmentsRepository);

        const data = {
            title,
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const noteAttachments = noteAttachmentsRepository.create(data);

        await noteAttachmentsRepository.update(id, noteAttachments);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "notes", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const noteAttachmentsRepository = getCustomRepository(NoteAttachmentsRepository);

        await noteAttachmentsRepository.delete(id);

        return response.status(204).send();
    }
}