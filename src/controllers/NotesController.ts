import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import noteView from '../views/noteView';
import { NotesRepository } from '../repositories/NotesRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "notes", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const notesRepository = getCustomRepository(NotesRepository);

        const notes = await notesRepository.find({
            order: {
                updated_at: "DESC"
            },
        });

        return response.json(noteView.renderMany(notes));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "notes", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const notesRepository = getCustomRepository(NotesRepository);

        const notes = await notesRepository.findOneOrFail(id, {
            relations: [
                'store',
                'shares',
                'attachments',
            ]
        });

        return response.json(noteView.render(notes));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "notes", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            title,
            text,
            store_only,
            store,
            shares,
        } = request.body;

        const notesRepository = getCustomRepository(NotesRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id);

        const data = {
            title,
            text,
            store_only,
            store,
            shares,
            created_by: userCreator.name,
            updated_by: userCreator.name,
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            text: Yup.string().notRequired(),
            store_only: Yup.boolean().notRequired(),
            store: Yup.string().notRequired(),
            shares: Yup.array(
                Yup.object().shape({
                    can_edit: Yup.boolean().notRequired(),
                    user: Yup.string().required(),
                }),
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const note = notesRepository.create(data);

        await notesRepository.save(note);

        return response.status(201).json(noteView.render(note));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "notes", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            title,
            text,
            store_only,
            store,
        } = request.body;

        const notesRepository = getCustomRepository(NotesRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id);

        const data = {
            title,
            text,
            store_only,
            store,
            updated_by: userCreator.name,
            updated_at: new Date(),
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            text: Yup.string().notRequired(),
            store_only: Yup.boolean().notRequired(),
            store: Yup.string().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const notes = notesRepository.create(data);

        await notesRepository.update(id, notes);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "notes", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const notesRepository = getCustomRepository(NotesRepository);

        await notesRepository.delete(id);

        return response.status(204).send();
    }
}