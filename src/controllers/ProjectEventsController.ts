import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import projectEventsView from '../views/projectEventView';
import { ProjectEventsRepository } from '../repositories/ProjectEventsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectEventsRepository = getCustomRepository(ProjectEventsRepository);

        const projectEvents = await projectEventsRepository.find({
            order: {
                done_at: "ASC"
            },
            relations: [
                'event',
                'project',
            ]
        });

        return response.json(projectEventsView.renderMany(projectEvents));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectEventsRepository = getCustomRepository(ProjectEventsRepository);

        const projectEvent = await projectEventsRepository.findOneOrFail(id, {
            relations: [
                'event',
                'project',
            ]
        });

        return response.json(projectEventsView.render(projectEvent));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            notes,
            done,
            done_at,
            event,
            project,
        } = request.body;

        const projectEventsRepository = getCustomRepository(ProjectEventsRepository);

        const data = {
            notes,
            done,
            done_at,
            event,
            project,
        };

        const schema = Yup.object().shape({
            notes: Yup.string().required(),
            done: Yup.boolean().notRequired(),
            done_at: Yup.date().notRequired(),
            event: Yup.string().required(),
            project: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectEvents = projectEventsRepository.create(data);

        await projectEventsRepository.save(projectEvents);

        return response.status(201).json(projectEventsView.render(projectEvents));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            notes,
            done,
            done_at,
        } = request.body;

        const projectEventsRepository = getCustomRepository(ProjectEventsRepository);

        const data = {
            notes,
            done,
            done_at,
        };

        const schema = Yup.object().shape({
            notes: Yup.string().required(),
            done: Yup.boolean().notRequired(),
            done_at: Yup.date().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectEvents = projectEventsRepository.create(data);

        await projectEventsRepository.update(id, projectEvents);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectEventsRepository = getCustomRepository(ProjectEventsRepository);

        await projectEventsRepository.delete(id);

        return response.status(204).send();
    }
}