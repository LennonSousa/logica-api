import { Request, Response } from 'express';
import { Between, FindConditions, getCustomRepository, Like } from 'typeorm';
import * as Yup from 'yup';

import serviceOrderView from '../views/serviceOrderView';
import { ServiceOrdersRepository } from '../repositories/ServiceOrdersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';
import ServiceOrdersModel from '../models/ServiceOrdersModel';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { start, end, limit = 10, page = 1, customer, store } = request.query;

        if (! await UsersRolesController.can(user_id, "services", "view") &&
            ! await UsersRolesController.can(user_id, "services", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id, {
            relations: ['store'],
        });

        const serviceOrdersRepository = getCustomRepository(ServiceOrdersRepository);

        let whereConditions: FindConditions<ServiceOrdersModel>[] = [];

        if (customer) {
            if (userCreator.store_only)
                whereConditions.push({
                    customer: Like(`%${customer}%`),
                    user: {
                        id: userCreator.id,
                    },
                    store: {
                        id: userCreator.store.id,
                    }
                });
            else {
                if (store) whereConditions.push({
                    customer: Like(`%${customer}%`),
                    store: {
                        id: store as string,
                    }
                });
                else whereConditions.push({
                    customer: Like(`%${customer}%`),
                });
            }
        }
        else {
            if (userCreator.store_only) whereConditions.push({
                user: {
                    id: userCreator.id,
                },
                store: {
                    id: userCreator.store.id,
                }
            });

            if (!userCreator.store_only && store) whereConditions.push({
                store: {
                    id: store as string,
                }
            });
        }

        if (await UsersRolesController.can(user_id, "services", "view_self")) {
            if (whereConditions.length > 0) {
                whereConditions[0] = {
                    ...whereConditions[0],
                    user: {
                        id: userCreator.id,
                    },
                }
            }
            else whereConditions.push({
                user: {
                    id: userCreator.id,
                },
            });
        }

        if (start && end) {
            if (whereConditions.length > 0) {
                whereConditions[0] = {
                    ...whereConditions[0],
                    start_at: Between(`${start} 00:00:00`, `${end} 23:59:59`)
                }
            }
            else whereConditions.push({ start_at: Between(`${start} 00:00:00`, `${end} 23:59:59`) });
        }

        const serviceOrders: ServiceOrdersModel[] = await serviceOrdersRepository.find({
            where: whereConditions,
            relations: [
                'store',
            ],
            order: {
                start_at: "DESC"
            },
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit)),
        });

        const totalPages = Math.ceil(serviceOrders.length / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(serviceOrderView.renderMany(serviceOrders));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "view") &&
            ! await UsersRolesController.can(user_id, "services", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id, {
            relations: ['store'],
        });

        const serviceOrdersRepository = getCustomRepository(ServiceOrdersRepository);

        const serviceOrder = await serviceOrdersRepository.findOneOrFail(id, {
            relations: [
                'user',
                'store',
                'project',
            ]
        });

        if (userCreator.store_only && serviceOrder.store.id !== userCreator.store.id)
            return response.status(403).send({ error: 'User permission not granted!' });

        if (await UsersRolesController.can(user_id, "services", "view_self") &&
            serviceOrder.user &&
            serviceOrder.user.id !== userCreator.id)
            return response.status(403).send({ error: 'User permission not granted!' });

        return response.json(serviceOrderView.render(serviceOrder));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            customer,
            document,
            phone,
            cellphone,
            contacts,
            email,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            coordinates,
            wifi_name,
            wifi_password,
            roof_details,
            electric_type,
            inversor_brand,
            inversor_potency,
            module_brand,
            module_amount,
            test_leak,
            test_meter,
            test_monitor,
            explanation,
            start_at,
            finish_at,
            technical,
            project,
            store,
        } = request.body;

        const serviceOrdersRepository = getCustomRepository(ServiceOrdersRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id);

        const data = {
            customer,
            document,
            phone,
            cellphone,
            contacts,
            email,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            coordinates,
            wifi_name,
            wifi_password,
            roof_details,
            electric_type,
            inversor_brand,
            inversor_potency,
            module_brand,
            module_amount,
            test_leak,
            test_meter,
            test_monitor,
            explanation,
            start_at,
            finish_at,
            technical,
            created_by: userCreator.name,
            user: userCreator,
            project,
            store,
        };

        const schema = Yup.object().shape({
            customer: Yup.string().required(),
            document: Yup.string().notRequired(),
            phone: Yup.string().notRequired(),
            cellphone: Yup.string().notRequired().nullable(),
            contacts: Yup.string().notRequired().nullable(),
            email: Yup.string().notRequired().nullable(),
            zip_code: Yup.string().notRequired(),
            street: Yup.string().notRequired(),
            number: Yup.string().notRequired(),
            neighborhood: Yup.string().notRequired(),
            complement: Yup.string().notRequired().nullable(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            coordinates: Yup.string().required(),
            wifi_name: Yup.string().required(),
            wifi_password: Yup.string().required(),
            roof_details: Yup.string().notRequired(),
            electric_type: Yup.string().required(),
            inversor_brand: Yup.string().required(),
            inversor_potency: Yup.number().required(),
            module_brand: Yup.string().required(),
            module_amount: Yup.number().required(),
            test_leak: Yup.boolean().notRequired(),
            test_meter: Yup.boolean().notRequired(),
            test_monitor: Yup.boolean().notRequired(),
            explanation: Yup.boolean().notRequired(),
            start_at: Yup.date().notRequired(),
            finish_at: Yup.date().notRequired(),
            technical: Yup.string().required(),
            created_by: Yup.string().required(),
            project: Yup.string().notRequired(),
            store: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const serviceOrder = serviceOrdersRepository.create(data);

        await serviceOrdersRepository.save(serviceOrder);

        return response.status(201).json(serviceOrderView.render(serviceOrder));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            customer,
            document,
            phone,
            cellphone,
            contacts,
            email,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            coordinates,
            wifi_name,
            wifi_password,
            roof_details,
            electric_type,
            inversor_brand,
            inversor_potency,
            module_brand,
            module_amount,
            test_leak,
            test_meter,
            test_monitor,
            explanation,
            start_at,
            finish_at,
            technical,
            store,
        } = request.body;

        const serviceOrdersRepository = getCustomRepository(ServiceOrdersRepository);

        const data = {
            customer,
            document,
            phone,
            cellphone,
            contacts,
            email,
            zip_code,
            street,
            number,
            neighborhood,
            complement,
            city,
            state,
            coordinates,
            wifi_name,
            wifi_password,
            roof_details,
            electric_type,
            inversor_brand,
            inversor_potency,
            module_brand,
            module_amount,
            test_leak,
            test_meter,
            test_monitor,
            explanation,
            start_at,
            finish_at,
            technical,
            store,
        };

        const schema = Yup.object().shape({
            customer: Yup.string().required(),
            document: Yup.string().required(),
            phone: Yup.string().notRequired(),
            cellphone: Yup.string().notRequired().nullable(),
            contacts: Yup.string().notRequired().nullable(),
            email: Yup.string().notRequired().nullable(),
            zip_code: Yup.string().notRequired(),
            street: Yup.string().notRequired(),
            number: Yup.string().notRequired(),
            neighborhood: Yup.string().notRequired(),
            complement: Yup.string().notRequired().nullable(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            coordinates: Yup.string().required(),
            wifi_name: Yup.string().required(),
            wifi_password: Yup.string().required(),
            roof_details: Yup.string().notRequired(),
            electric_type: Yup.string().required(),
            inversor_brand: Yup.string().required(),
            inversor_potency: Yup.number().required(),
            module_brand: Yup.string().required(),
            module_amount: Yup.number().required(),
            test_leak: Yup.boolean().notRequired(),
            test_meter: Yup.boolean().notRequired(),
            test_monitor: Yup.boolean().notRequired(),
            explanation: Yup.boolean().notRequired(),
            start_at: Yup.date().notRequired(),
            finish_at: Yup.date().notRequired(),
            technical: Yup.string().required(),
            store: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const serviceOrder = serviceOrdersRepository.create(data);

        await serviceOrdersRepository.update(id, serviceOrder);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceOrdersRepository = getCustomRepository(ServiceOrdersRepository);

        await serviceOrdersRepository.delete(id);

        return response.status(204).send();
    }
}