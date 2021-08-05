import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import payTypeView from '../views/payTypeView';
import { PayTypesRepository } from '../repositories/PayTypesRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const payTypesRepository = getCustomRepository(PayTypesRepository);

        const payTypes = await payTypesRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(payTypeView.renderMany(payTypes));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const payTypesRepository = getCustomRepository(PayTypesRepository);

        const payType = await payTypesRepository.findOneOrFail(id);

        return response.json(payTypeView.render(payType));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            description,
            order,
            active,
        } = request.body;

        const payTypesRepository = getCustomRepository(PayTypesRepository);

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

        const payTypes = payTypesRepository.create(data);

        await payTypesRepository.save(payTypes);

        return response.status(201).json(payTypeView.render(payTypes));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            description,
            order,
            active,
        } = request.body;

        const payTypesRepository = getCustomRepository(PayTypesRepository);

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

        const payTypes = payTypesRepository.create(data);

        await payTypesRepository.update(id, payTypes);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const payTypesRepository = getCustomRepository(PayTypesRepository);

        await payTypesRepository.delete(id);

        return response.status(204).send();
    }
}