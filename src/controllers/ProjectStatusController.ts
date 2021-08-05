import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import projectStatusView from '../views/projectStatusView';
import { ProjectStatusRepository } from '../repositories/ProjectStatusRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectStatusRepository = getCustomRepository(ProjectStatusRepository);

        const projectStatus = await projectStatusRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(projectStatusView.renderMany(projectStatus));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectStatusRepository = getCustomRepository(ProjectStatusRepository);

        const projectStatus = await projectStatusRepository.findOneOrFail(id);

        return response.json(projectStatusView.render(projectStatus));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            order,
        } = request.body;

        const projectStatusRepository = getCustomRepository(ProjectStatusRepository);

        const data = {
            name,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectStatus = projectStatusRepository.create(data);

        await projectStatusRepository.save(projectStatus);

        return response.status(201).json(projectStatusView.render(projectStatus));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            order,
        } = request.body;

        const projectStatusRepository = getCustomRepository(ProjectStatusRepository);

        const data = {
            name,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectStatus = projectStatusRepository.create(data);

        await projectStatusRepository.update(id, projectStatus);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectStatusRepository = getCustomRepository(ProjectStatusRepository);

        await projectStatusRepository.delete(id);

        return response.status(204).send();
    }
}