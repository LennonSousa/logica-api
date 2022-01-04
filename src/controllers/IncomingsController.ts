import { Request, Response } from 'express';
import { Between, FindConditions, getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import incomingsView from '../views/incomeView';
import { IncomingsRepository } from '../repositories/IncomingsRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';
import IncomingsModel from '../models/IncomingsModel';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { start, end, limit = 10, page = 1, store } = request.query;

        if (! await UsersRolesController.can(user_id, "finances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id, {
            relations: ['store'],
        });

        const incomingsRepository = getCustomRepository(IncomingsRepository);

        let whereConditions: FindConditions<IncomingsModel>[] = [];

        if (userCreator.store_only) whereConditions.push({
            store: {
                id: userCreator.store.id,
            }
        });

        if (!userCreator.store_only && store) whereConditions.push({
            store: {
                id: store as string,
            }
        });

        if (start && end) {
            if (whereConditions.length > 0) {
                whereConditions[0] = {
                    ...whereConditions[0],
                    created_at: Between(`${start} 00:00:00`, `${end} 23:59:59`)
                }
            }
            else whereConditions.push({ created_at: Between(`${start} 00:00:00`, `${end} 23:59:59`) });
        }

        const incomings: IncomingsModel[] = await incomingsRepository.find({
            where: whereConditions,
            relations: [
                'items',
            ],
            order: {
                created_at: "ASC"
            },
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit)),
        });

        const totalPages = Math.ceil(incomings.length / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(incomingsView.renderMany(incomings));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id, {
            relations: [
                'store'
            ],
        });

        const incomingsRepository = getCustomRepository(IncomingsRepository);

        const income = await incomingsRepository.findOneOrFail(id, {
            relations: [
                'store',
                'project',
                'payType',
                'items',
                'attachments',
                'attachments.income',
            ]
        });

        if (userCreator.store_only && income.store.id !== userCreator.store.id)
            return response.status(403).send({ error: 'User permission not granted!' });

        return response.json(incomingsView.render(income));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            description,
            value,
            store,
            project,
            payType,
            items,
        } = request.body;

        const incomingsRepository = getCustomRepository(IncomingsRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id);

        const data = {
            description,
            value,
            created_by: userCreator.name,
            store,
            project,
            payType,
            items,
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            value: Yup.number().required(),
            store: Yup.string().required(),
            project: Yup.string().notRequired(),
            payType: Yup.string().required(),
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
            store,
            project,
            payType,
            items,
        } = request.body;

        const incomingsRepository = getCustomRepository(IncomingsRepository);

        const data = {
            description,
            value,
            store,
            project,
            payType,
            items,
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            value: Yup.number().required(),
            store: Yup.string().required(),
            project: Yup.string().notRequired().nullable(),
            payType: Yup.string().required(),
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