import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import notificationView from '../views/notificationView';
import { NotificationsRepository } from '../repositories/NotificationsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "settings", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const notificationsRepository = getCustomRepository(NotificationsRepository);

        const notifications = await notificationsRepository.find();

        return response.json(notificationView.renderMany(notifications));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "settings", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const notificationsRepository = getCustomRepository(NotificationsRepository);

        const notification = await notificationsRepository.findOneOrFail(id);

        return response.json(notificationView.render(notification));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "settings", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            recipients,
            group,
            stageId,
        } = request.body;

        const notificationsRepository = getCustomRepository(NotificationsRepository);

        const data = {
            recipients,
            group,
            stageId,
        };

        const schema = Yup.object().shape({
            recipients: Yup.string().required(),
            group: Yup.mixed().oneOf([
                'estimates', 'projects'
            ]).required(),
            stageId: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const notifications = notificationsRepository.create(data);

        await notificationsRepository.save(notifications);

        return response.status(201).json(notificationView.render(notifications));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "settings", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            recipients,
            group,
            stageId,
        } = request.body;

        const notificationsRepository = getCustomRepository(NotificationsRepository);

        const data = {
            recipients,
            group,
            stageId,
        };

        const schema = Yup.object().shape({
            recipients: Yup.string().required(),
            group: Yup.mixed().oneOf([
                'estimates', 'projects'
            ]).required(),
            stageId: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const notifications = notificationsRepository.create(data);

        await notificationsRepository.update(id, notifications);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "settings", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const notificationsRepository = getCustomRepository(NotificationsRepository);

        await notificationsRepository.delete(id);

        return response.status(204).send();
    }
}