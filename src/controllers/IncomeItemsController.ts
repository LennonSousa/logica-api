import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import incomeItemsView from '../views/incomeItemView';
import { IncomeItemsRepository } from '../repositories/IncomeItemsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const incomeItemsRepository = getCustomRepository(IncomeItemsRepository);

        const incomeItems = await incomeItemsRepository.find({
            order: {
                received_at: "ASC"
            },
        });

        return response.json(incomeItemsView.renderMany(incomeItems));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const incomeItemsRepository = getCustomRepository(IncomeItemsRepository);

        const incomeItems = await incomeItemsRepository.findOneOrFail(id);

        return response.json(incomeItemsView.render(incomeItems));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            description,
            value,
            is_paid,
            received_at,
            income,
        } = request.body;

        const incomeItemsRepository = getCustomRepository(IncomeItemsRepository);

        const data = {
            description,
            value,
            is_paid,
            received_at,
            income,
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            value: Yup.number().required(),
            is_paid: Yup.boolean().notRequired(),
            received_at: Yup.date().notRequired(),
            income: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const incomeItems = incomeItemsRepository.create(data);

        await incomeItemsRepository.save(incomeItems);

        return response.status(201).json(incomeItemsView.render(incomeItems));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            description,
            value,
            is_paid,
            received_at,
        } = request.body;

        const incomeItemsRepository = getCustomRepository(IncomeItemsRepository);

        const data = {
            description,
            value,
            is_paid,
            received_at,
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            value: Yup.number().required(),
            is_paid: Yup.boolean().notRequired(),
            received_at: Yup.date().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const incomeItems = incomeItemsRepository.create(data);

        await incomeItemsRepository.update(id, incomeItems);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const incomeItemsRepository = getCustomRepository(IncomeItemsRepository);

        await incomeItemsRepository.delete(id);

        return response.status(204).send();
    }
}