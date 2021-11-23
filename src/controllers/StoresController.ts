import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import storeView from '../views/storeView';
import { StoresRepository } from '../repositories/StoresRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(_request: Request, response: Response) {
        const storeRepository = getCustomRepository(StoresRepository);

        const stores = await storeRepository.find();

        return response.json(storeView.renderMany(stores));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "store", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const storeRepository = getCustomRepository(StoresRepository);

        const store = await storeRepository.findOneOrFail(id);

        return response.json(storeView.render(store));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "store", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            title,
            name,
            phone,
            description,
            email,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            document,
            services_in,
            warranty,
            engineer,
        } = request.body;

        const storeRepository = getCustomRepository(StoresRepository);

        if (!request.file)
            return response.status(400).send({ error: 'Avatar is a required field!' });

        const avatar = request.file as Express.Multer.File;

        const data = {
            title,
            name,
            avatar: avatar.filename,
            phone,
            description,
            email,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            document,
            services_in,
            warranty,
            engineer,
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            name: Yup.string().required(),
            avatar: Yup.string().required(),
            phone: Yup.string().notRequired(),
            description: Yup.string().notRequired().nullable(),
            email: Yup.string().notRequired(),
            zip_code: Yup.string().notRequired(),
            street: Yup.string().notRequired(),
            number: Yup.string().notRequired(),
            neighborhood: Yup.string().notRequired(),
            complement: Yup.string().notRequired().nullable(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            document: Yup.string().required(),
            services_in: Yup.string().notRequired().nullable(),
            warranty: Yup.string().notRequired().nullable(),
            engineer: Yup.string().notRequired().nullable(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const store = storeRepository.create(data);

        await storeRepository.save(store);

        return response.status(201).json(storeView.render(store));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "store", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            title,
            name,
            phone,
            description,
            email,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            document,
            services_in,
            warranty,
            engineer,
        } = request.body;

        const storeRepository = getCustomRepository(StoresRepository);

        if (request.file) {
            const avatar = request.file as Express.Multer.File;

            const data = {
                title,
                name,
                avatar: avatar.filename,
                phone,
                description,
                email,
                zip_code,
                street,
                number,
                neighborhood,
                complement,
                city,
                state,
                document,
                services_in,
                warranty,
                engineer,
            };

            const schema = Yup.object().shape({
                title: Yup.string().required(),
                name: Yup.string().required(),
                avatar: Yup.string().required(),
                phone: Yup.string().notRequired(),
                description: Yup.string().notRequired().nullable(),
                email: Yup.string().notRequired(),
                zip_code: Yup.string().notRequired(),
                street: Yup.string().notRequired(),
                number: Yup.string().notRequired(),
                neighborhood: Yup.string().notRequired(),
                complement: Yup.string().notRequired().nullable(),
                city: Yup.string().required(),
                state: Yup.string().required(),
                document: Yup.string().required(),
                services_in: Yup.string().notRequired().nullable(),
                warranty: Yup.string().notRequired().nullable(),
                engineer: Yup.string().notRequired().nullable(),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const store = storeRepository.create(data);

            await storeRepository.update(id, store);

            return response.status(204).json();
        }

        const data = {
            title,
            name,
            phone,
            description,
            email,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            document,
            services_in,
            warranty,
            engineer,
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            name: Yup.string().required(),
            phone: Yup.string().notRequired(),
            description: Yup.string().notRequired().nullable(),
            email: Yup.string().notRequired(),
            zip_code: Yup.string().notRequired(),
            street: Yup.string().notRequired(),
            number: Yup.string().notRequired(),
            neighborhood: Yup.string().notRequired(),
            complement: Yup.string().notRequired().nullable(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            document: Yup.string().required(),
            services_in: Yup.string().notRequired().nullable(),
            warranty: Yup.string().notRequired().nullable(),
            engineer: Yup.string().notRequired().nullable(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const store = storeRepository.create(data);

        await storeRepository.update(id, store);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "store", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const storesRepository = getCustomRepository(StoresRepository);

        await storesRepository.update(id, { active: false });

        return response.status(204).send();
    }
}