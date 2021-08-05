import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import incomingsView from '../views/incomeView';
import { IncomingsRepository } from '../repositories/IncomingsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const incomingsRepository = getCustomRepository(IncomingsRepository);

        const incomings = await incomingsRepository.find({
            order: {
                created_at: "ASC"
            }
        });

        return response.json(incomingsView.renderMany(incomings));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const incomingsRepository = getCustomRepository(IncomingsRepository);

        const income = await incomingsRepository.findOneOrFail(id, {
            relations: [
                'project',
                'pay_type',
                'items',
                'attachments',
            ]
        });

        return response.json(incomingsView.render(income));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            description,
            value,
            project,
            pay_type,
            items,
        } = request.body;

        const incomingsRepository = getCustomRepository(IncomingsRepository);

        const data = {
            description,
            value,
            project,
            pay_type,
            items,
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            value: Yup.number().required(),
            project: Yup.boolean().notRequired(),
            pay_type: Yup.string().required(),
            items: Yup.array(
                Yup.object().shape({
                    description: Yup.string().required(),
                    value: Yup.number().required(),
                    is_paid: Yup.boolean().notRequired(),
                    received_at: Yup.date().notRequired(),
                })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const incomings = incomingsRepository.create(data);

        await incomingsRepository.save(incomings);

        return response.status(201).json(incomingsView.render(incomings));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            description,
            value,
            project,
            pay_type,
            items,
        } = request.body;

        const incomingsRepository = getCustomRepository(IncomingsRepository);

        const data = {
            description,
            value,
            project,
            pay_type,
            items,
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            value: Yup.number().required(),
            project: Yup.boolean().notRequired(),
            pay_type: Yup.string().required(),
            items: Yup.array(
                Yup.object().shape({
                    description: Yup.string().required(),
                    value: Yup.number().required(),
                    is_paid: Yup.boolean().notRequired(),
                    received_at: Yup.date().notRequired(),
                })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const incomings = incomingsRepository.create(data);

        await incomingsRepository.update(id, incomings);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const incomingsRepository = getCustomRepository(IncomingsRepository);

        await incomingsRepository.delete(id);

        return response.status(204).send();
    }
}