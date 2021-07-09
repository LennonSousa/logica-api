import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import estimateStatusView from '../views/estimateStatusView';
import { EstimateStatusRepository } from '../repositories/EstimateStatusRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const estimateStatusRepository = getCustomRepository(EstimateStatusRepository);

        const estimateStatus = await estimateStatusRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(estimateStatusView.renderMany(estimateStatus));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const estimateStatusRepository = getCustomRepository(EstimateStatusRepository);

        const estimateStatus = await estimateStatusRepository.findOneOrFail(id);

        return response.json(estimateStatusView.render(estimateStatus));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            order,
        } = request.body;

        const estimateStatusRepository = getCustomRepository(EstimateStatusRepository);

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

        const estimateStatus = estimateStatusRepository.create(data);

        await estimateStatusRepository.save(estimateStatus);

        return response.status(201).json(estimateStatusView.render(estimateStatus));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            order,
        } = request.body;

        const estimateStatusRepository = getCustomRepository(EstimateStatusRepository);

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

        const estimateStatus = estimateStatusRepository.create(data);

        await estimateStatusRepository.update(id, estimateStatus);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const estimateStatusRepository = getCustomRepository(EstimateStatusRepository);

        await estimateStatusRepository.delete(id);

        return response.status(204).send();
    }
}