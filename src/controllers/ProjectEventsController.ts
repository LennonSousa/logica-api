import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import notifications from '../modules/notifications';
import projectEventsView from '../views/projectEventView';
import { ProjectEventsRepository } from '../repositories/ProjectEventsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view") &&
            ! await UsersRolesController.can(user_id, "projects", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectEventsRepository = getCustomRepository(ProjectEventsRepository);

        const projectEvents = await projectEventsRepository.find({
            where: {
                project: {
                    id
                }
            },
            order: {
                done_at: "ASC"
            },
            relations: [
                'event',
            ]
        });

        return response.json(projectEventsView.renderMany(projectEvents));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view") &&
            ! await UsersRolesController.can(user_id, "projects", "view_self"))
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

        if (! await UsersRolesController.can(user_id, "projects", "create"))
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
            notes: Yup.string().notRequired(),
            done: Yup.boolean().notRequired(),
            done_at: Yup.date().notRequired(),
            event: Yup.string().required(),
            project: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const newProjectEvent = projectEventsRepository.create(data);

        await projectEventsRepository.save(newProjectEvent);

        if (done) {
            const projectEvent = await projectEventsRepository.findOneOrFail(newProjectEvent.id, {
                relations: [
                    'event',
                    'project',
                ]
            });

            notifications.projectVerify(
                {
                    id: projectEvent.project.id,
                    stageId: projectEvent.event.id,
                    projectEvent,
                    project: projectEvent.project,
                }
            );
        }

        return response.status(201).json(projectEventsView.render(newProjectEvent));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "update"))
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
            notes: Yup.string().notRequired().nullable(),
            done: Yup.boolean().notRequired(),
            done_at: Yup.date().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        if (done) {
            const projectEvent = await projectEventsRepository.findOneOrFail(id, {
                relations: [
                    'event',
                    'project',
                ]
            });

            if (!projectEvent.done) {
                notifications.projectVerify(
                    {
                        id: projectEvent.project.id,
                        stageId: projectEvent.event.id,
                        projectEvent,
                        project: projectEvent.project,
                    }
                );
            }
        }

        const projectEvents = projectEventsRepository.create(data);

        await projectEventsRepository.update(id, projectEvents);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectEventsRepository = getCustomRepository(ProjectEventsRepository);

        await projectEventsRepository.delete(id);

        return response.status(204).send();
    }
}