import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import storeView from '../views/storeView';
import { StoreRepository } from '../repositories/StoreRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async show(request: Request, response: Response) {
        const storeRepository = getCustomRepository(StoreRepository);

        const store = await storeRepository.findOneOrFail();

        return response.json(storeView.render(store));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "store", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            title,
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

        const storeRepository = getCustomRepository(StoreRepository);

        if (request.file) {
            const avatar = request.file as Express.Multer.File;

            const data = {
                title,
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
}