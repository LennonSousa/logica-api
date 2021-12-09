import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import eventsProjectView from '../views/eventProjectView';
import { EventsProjectRepository } from '../repositories/EventsProjectRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view") &&
            ! await UsersRolesController.can(user_id, "projects", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        const eventsProject = await eventsProjectRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(eventsProjectView.renderMany(eventsProject));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view") &&
            ! await UsersRolesController.can(user_id, "projects", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        const eventsProject = await eventsProjectRepository.findOneOrFail(id);

        return response.json(eventsProjectView.render(eventsProject));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            description,
            order,
            active,
        } = request.body;

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        const data = {
            description,
            order,
            active,
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            order: Yup.number().required(),
            active: Yup.boolean().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const eventsProject = eventsProjectRepository.create(data);

        await eventsProjectRepository.save(eventsProject);

        return response.status(201).json(eventsProjectView.render(eventsProject));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            description,
            order,
            active,
        } = request.body;

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        const data = {
            description,
            order,
            active,
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            order: Yup.number().required(),
            active: Yup.boolean().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const eventsProject = eventsProjectRepository.create(data);

        await eventsProjectRepository.update(id, eventsProject);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const eventsProjectRepository = getCustomRepository(EventsProjectRepository);

        await eventsProjectRepository.delete(id);

        return response.status(204).send();
    }
}