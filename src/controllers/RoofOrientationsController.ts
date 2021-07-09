import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import roofOrientationView from '../views/roofOrientationView';
import { RoofOrientationsRepository } from '../repositories/RoofOrientationsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const roofOrientationsRepository = getCustomRepository(RoofOrientationsRepository);

        const roofOrientations = await roofOrientationsRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(roofOrientationView.renderMany(roofOrientations));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const roofOrientationsRepository = getCustomRepository(RoofOrientationsRepository);

        const roofOrientations = await roofOrientationsRepository.findOneOrFail(id);

        return response.json(roofOrientationView.render(roofOrientations));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            increment,
            order,
        } = request.body;

        const roofOrientationsRepository = getCustomRepository(RoofOrientationsRepository);

        const data = {
            name,
            increment,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            increment: Yup.number().notRequired(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const roofOrientations = roofOrientationsRepository.create(data);

        await roofOrientationsRepository.save(roofOrientations);

        return response.status(201).json(roofOrientationView.render(roofOrientations));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            increment,
            order,
        } = request.body;

        const roofOrientationsRepository = getCustomRepository(RoofOrientationsRepository);

        const data = {
            name,
            increment,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            increment: Yup.number().notRequired(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const roofOrientations = roofOrientationsRepository.create(data);

        await roofOrientationsRepository.update(id, roofOrientations);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const roofOrientationsRepository = getCustomRepository(RoofOrientationsRepository);

        await roofOrientationsRepository.delete(id);

        return response.status(204).send();
    }
}