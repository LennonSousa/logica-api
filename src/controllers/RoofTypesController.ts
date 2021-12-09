import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import roofTypesView from '../views/roofTypeView';
import { RoofTypesRepository } from '../repositories/RoofTypesRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view") &&
            ! await UsersRolesController.can(user_id, "estimates", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const roofTypesRepository = getCustomRepository(RoofTypesRepository);

        const roofTypes = await roofTypesRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(roofTypesView.renderMany(roofTypes));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view") &&
            ! await UsersRolesController.can(user_id, "estimates", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const roofTypesRepository = getCustomRepository(RoofTypesRepository);

        const roofTypes = await roofTypesRepository.findOneOrFail(id);

        return response.json(roofTypesView.render(roofTypes));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view") &&
            ! await UsersRolesController.can(user_id, "estimates", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            order,
        } = request.body;

        const roofTypesRepository = getCustomRepository(RoofTypesRepository);

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

        const roofTypes = roofTypesRepository.create(data);

        await roofTypesRepository.save(roofTypes);

        return response.status(201).json(roofTypesView.render(roofTypes));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view") &&
            ! await UsersRolesController.can(user_id, "estimates", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            order,
        } = request.body;

        const roofTypesRepository = getCustomRepository(RoofTypesRepository);

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

        const roofTypes = roofTypesRepository.create(data);

        await roofTypesRepository.update(id, roofTypes);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        const roofTypesRepository = getCustomRepository(RoofTypesRepository);

        await roofTypesRepository.delete(id);

        return response.status(204).send();
    }
}