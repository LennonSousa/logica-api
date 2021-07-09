import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import panelView from '../views/panelView';
import { PanelsRepository } from '../repositories/PanelsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const panelsRepository = getCustomRepository(PanelsRepository);

        const panels = await panelsRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(panelView.renderMany(panels));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const panelsRepository = getCustomRepository(PanelsRepository);

        const panels = await panelsRepository.findOneOrFail(id, {
            relations: [
                'prices'
            ]
        });

        return response.json(panelView.render(panels));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            capacity,
            paused,
            order,
        } = request.body;

        const panelsRepository = getCustomRepository(PanelsRepository);

        const data = {
            name,
            capacity,
            paused,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            capacity: Yup.number().notRequired(),
            paused: Yup.boolean().notRequired(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const panels = panelsRepository.create(data);

        await panelsRepository.save(panels);

        return response.status(201).json(panelView.render(panels));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            capacity,
            paused,
            order,
        } = request.body;

        const panelsRepository = getCustomRepository(PanelsRepository);

        const data = {
            name,
            capacity,
            paused,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            capacity: Yup.number().notRequired(),
            paused: Yup.boolean().notRequired(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const panels = panelsRepository.create(data);

        await panelsRepository.update(id, panels);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const panelsRepository = getCustomRepository(PanelsRepository);

        await panelsRepository.delete(id);

        return response.status(204).send();
    }
}