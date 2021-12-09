import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import attachmentsRequiredProjectView from '../views/attachmentRequiredProjectView';
import { AttachmentsRequiredProjectRepository } from '../repositories/AttachmentsRequiredProjectRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view") &&
            ! await UsersRolesController.can(user_id, "projects", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const attachmentsRequiredProjectRepository = getCustomRepository(AttachmentsRequiredProjectRepository);

        const attachmentsRequiredProject = await attachmentsRequiredProjectRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(attachmentsRequiredProjectView.renderMany(attachmentsRequiredProject));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view") &&
            ! await UsersRolesController.can(user_id, "projects", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const attachmentsRequiredProjectRepository = getCustomRepository(AttachmentsRequiredProjectRepository);

        const attachmentsRequiredProject = await attachmentsRequiredProjectRepository.findOneOrFail(id);

        return response.json(attachmentsRequiredProjectView.render(attachmentsRequiredProject));
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

        const attachmentsRequiredProjectRepository = getCustomRepository(AttachmentsRequiredProjectRepository);

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

        const attachmentsRequiredProject = attachmentsRequiredProjectRepository.create(data);

        await attachmentsRequiredProjectRepository.save(attachmentsRequiredProject);

        return response.status(201).json(attachmentsRequiredProjectView.render(attachmentsRequiredProject));
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

        const attachmentsRequiredProjectRepository = getCustomRepository(AttachmentsRequiredProjectRepository);

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

        const attachmentsRequiredProject = attachmentsRequiredProjectRepository.create(data);

        await attachmentsRequiredProjectRepository.update(id, attachmentsRequiredProject);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const attachmentsRequiredProjectRepository = getCustomRepository(AttachmentsRequiredProjectRepository);

        await attachmentsRequiredProjectRepository.delete(id);

        return response.status(204).send();
    }
}