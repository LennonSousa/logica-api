import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import panelPriceView from '../views/panelPriceView';
import { PanelPricesRepository } from '../repositories/PanelPricesRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        const panelPricesRepository = getCustomRepository(PanelPricesRepository);

        const panelPrices = await panelPricesRepository.find({
            order: {
                potency: "ASC"
            }
        });

        return response.json(panelPriceView.renderMany(panelPrices));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        const panelPricesRepository = getCustomRepository(PanelPricesRepository);

        const panelPrices = await panelPricesRepository.findOneOrFail(id);

        return response.json(panelPriceView.render(panelPrices));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        const {
            name,
            potency,
            price,
            inversor,
        } = request.body;

        const panelPricesRepository = getCustomRepository(PanelPricesRepository);

        const data = {
            name,
            potency,
            price,
            inversor,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            potency: Yup.number().notRequired(),
            price: Yup.number().notRequired(),
            inversor: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const panelPrices = panelPricesRepository.create(data);

        await panelPricesRepository.save(panelPrices);

        return response.status(201).json(panelPriceView.render(panelPrices));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        const {
            name,
            potency,
            price,
            inversor,
        } = request.body;

        const panelPricesRepository = getCustomRepository(PanelPricesRepository);

        const data = {
            name,
            potency,
            price,
            inversor,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            potency: Yup.number().notRequired(),
            price: Yup.boolean().notRequired(),
            inversor: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const panelPrices = panelPricesRepository.create(data);

        await panelPricesRepository.update(id, panelPrices);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        const panelPricesRepository = getCustomRepository(PanelPricesRepository);

        await panelPricesRepository.delete(id);

        return response.status(204).send();
    }
}