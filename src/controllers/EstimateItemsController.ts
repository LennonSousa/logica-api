import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import estimateItemView from '../views/estimateItemView';
import { EstimateItemsRepository } from '../repositories/EstimateItemsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const estimateItemsRepository = getCustomRepository(EstimateItemsRepository);

        const estimateItems = await estimateItemsRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(estimateItemView.renderMany(estimateItems));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const estimateItemsRepository = getCustomRepository(EstimateItemsRepository);

        const estimateItems = await estimateItemsRepository.findOneOrFail(id);

        return response.json(estimateItemView.render(estimateItems));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            amount,
            price,
            percent,
            order,
            estimate,
        } = request.body;

        const estimateItemsRepository = getCustomRepository(EstimateItemsRepository);

        const data = {
            name,
            amount,
            price,
            percent,
            order,
            estimate,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            amount: Yup.number().required(),
            price: Yup.number().required(),
            percent: Yup.number().required(),
            order: Yup.number().required(),
            estimate: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const estimateItems = estimateItemsRepository.create(data);

        await estimateItemsRepository.save(estimateItems);

        return response.status(201).json(estimateItemView.render(estimateItems));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            amount,
            price,
            percent,
            order,
        } = request.body;

        const estimateItemsRepository = getCustomRepository(EstimateItemsRepository);

        const data = {
            name,
            amount,
            price,
            percent,
            order,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            amount: Yup.number().required(),
            price: Yup.number().required(),
            percent: Yup.number().required(),
            order: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const estimateItems = estimateItemsRepository.create(data);

        await estimateItemsRepository.update(id, estimateItems);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const estimateItemsRepository = getCustomRepository(EstimateItemsRepository);

        await estimateItemsRepository.delete(id);

        return response.status(204).send();
    }
}