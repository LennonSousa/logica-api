import { Request, Response } from 'express';
import { Between, FindConditions, getCustomRepository, Like } from 'typeorm';
import * as Yup from 'yup';

import notifications from '../modules/notifications';
import estimateView from '../views/estimateView';
import { EstimatesRepository } from '../repositories/EstimatesRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';
import EstimatesModel from '../models/EstimatesModel';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { customer, store, user, start, end, limit = 10, page = 1 } = request.query;

        if (! await UsersRolesController.can(user_id, "estimates", "view") &&
            ! await UsersRolesController.can(user_id, "estimates", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id, {
            relations: ['store'],
        });

        const estimatesRepository = getCustomRepository(EstimatesRepository);

        let whereConditions: FindConditions<EstimatesModel> = {};

        if (customer) {
            if (whereConditions) {
                whereConditions = {
                    ...whereConditions,
                    customer: Like(`%${customer}%`)
                }
            }
            else whereConditions = { customer: Like(`%${customer}%`) };
        }

        if (!userCreator.store_only) {
            if (store) {
                if (whereConditions) {
                    whereConditions = {
                        ...whereConditions,
                        store: {
                            id: store as string,
                        },
                    }
                }
                else whereConditions = {
                    store: {
                        id: store as string,
                    },
                }
            }

            if (user) {
                whereConditions = {
                    ...whereConditions,
                    user: {
                        id: user as string,
                    },
                }
            }
        } else if (await UsersRolesController.can(user_id, "estimates", "view_self")) {
            if (whereConditions) {
                whereConditions = {
                    ...whereConditions,
                    store: {
                        id: userCreator.store.id,
                    },
                    user: {
                        id: userCreator.id,
                    },
                }
            }
            else whereConditions = {
                store: {
                    id: userCreator.store.id,
                },
                user: {
                    id: userCreator.id,
                },
            }
        } else {
            if (whereConditions) {
                whereConditions = {
                    ...whereConditions,
                    store: {
                        id: userCreator.store.id,
                    },
                }
            }
            else whereConditions = {
                store: {
                    id: userCreator.store.id,
                },
            }

            if (user) {
                whereConditions = {
                    ...whereConditions,
                    user: {
                        id: user as string,
                    },
                }
            }
        }


        if (start && end) {
            if (whereConditions) {
                whereConditions = {
                    ...whereConditions,
                    created_at: Between(`${start} 00:00:00`, `${end} 23:59:59`)
                }
            }
            else whereConditions = { created_at: Between(`${start} 00:00:00`, `${end} 23:59:59`) };
        }

        const estimates: EstimatesModel[] = await estimatesRepository.find({
            where: whereConditions,
            relations: [
                'status',
                'store',
            ],
            order: {
                updated_at: "DESC"
            },
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit)),
        });

        const totalItems = await estimatesRepository.count({
            where: whereConditions
        });

        const totalPages = Math.ceil(totalItems / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(estimateView.renderMany(estimates));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "view") &&
            ! await UsersRolesController.can(user_id, "estimates", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id, {
            relations: ['store'],
        });

        const estimatesRepository = getCustomRepository(EstimatesRepository);

        const estimate = await estimatesRepository.findOneOrFail(id, {
            relations: [
                'user',
                'store',
                'panel',
                'panel.prices',
                'roof_orientation',
                'roof_type',
                'status',
                'items',
            ]
        });

        if (userCreator.store_only && estimate.store.id !== userCreator.store.id)
            return response.status(403).send({ error: 'User permission not granted!' });

        if (await UsersRolesController.can(user_id, "estimates", "view_self") &&
            estimate.user &&
            estimate.user.id !== userCreator.id)
            return response.status(403).send({ error: 'User permission not granted!' });

        return response.json(estimateView.render(estimate));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            customer,
            customer_from,
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
            energy_company,
            unity,
            kwh,
            irradiation,
            month_01,
            month_02,
            month_03,
            month_04,
            month_05,
            month_06,
            month_07,
            month_08,
            month_09,
            month_10,
            month_11,
            month_12,
            month_13,
            average_increase,
            discount_percent,
            discount,
            increase_percent,
            increase,
            show_values,
            show_discount,
            notes,
            created_at,
            updated_at,
            store,
            panel,
            roof_orientation,
            roof_type,
            status,
            items,
        } = request.body;

        const estimatesRepository = getCustomRepository(EstimatesRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id);

        const data = {
            customer,
            customer_from,
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
            energy_company,
            unity,
            kwh,
            irradiation,
            month_01,
            month_02,
            month_03,
            month_04,
            month_05,
            month_06,
            month_07,
            month_08,
            month_09,
            month_10,
            month_11,
            month_12,
            month_13,
            average_increase,
            discount_percent,
            discount,
            increase_percent,
            increase,
            show_values,
            show_discount,
            notes,
            created_by: userCreator.name,
            created_at,
            updated_by: userCreator.name,
            updated_at,
            user: userCreator,
            store,
            panel,
            roof_orientation,
            roof_type,
            status,
            items,
        };

        const schema = Yup.object().shape({
            customer: Yup.string().required(),
            customer_from: Yup.mixed().oneOf([
                'site', 'social', 'customer', 'internet', 'street'
            ]).required(),
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
            energy_company: Yup.string().notRequired(),
            unity: Yup.string().notRequired(),
            kwh: Yup.number().required(),
            irradiation: Yup.number().required(),
            month_01: Yup.number().required(),
            month_02: Yup.number().required(),
            month_03: Yup.number().required(),
            month_04: Yup.number().required(),
            month_05: Yup.number().required(),
            month_06: Yup.number().required(),
            month_07: Yup.number().required(),
            month_08: Yup.number().required(),
            month_09: Yup.number().required(),
            month_10: Yup.number().required(),
            month_11: Yup.number().required(),
            month_12: Yup.number().required(),
            month_13: Yup.number().required(),
            average_increase: Yup.number().required(),
            discount_percent: Yup.boolean().notRequired(),
            discount: Yup.number().required(),
            increase_percent: Yup.boolean().notRequired(),
            increase: Yup.number().required(),
            show_values: Yup.boolean().notRequired(),
            show_discount: Yup.boolean().notRequired(),
            notes: Yup.string().notRequired().nullable(),
            created_by: Yup.string().required(),
            updated_by: Yup.string().required(),
            store: Yup.string().required(),
            panel: Yup.string().required(),
            roof_orientation: Yup.string().required(),
            roof_type: Yup.string().required(),
            status: Yup.string().required(),
            items: Yup.array(
                Yup.object().shape({
                    name: Yup.string().required(),
                    amount: Yup.number().required(),
                    price: Yup.number().required(),
                    percent: Yup.number().required(),
                    order: Yup.number().required(),
                })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const estimate = estimatesRepository.create(data);

        await estimatesRepository.save(estimate);

        notifications.estimateVerify(
            {
                id: estimate.id,
                stageId: status,
            }
        );

        return response.status(201).json(estimateView.render(estimate));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            customer,
            customer_from,
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
            energy_company,
            unity,
            kwh,
            irradiation,
            month_01,
            month_02,
            month_03,
            month_04,
            month_05,
            month_06,
            month_07,
            month_08,
            month_09,
            month_10,
            month_11,
            month_12,
            month_13,
            average_increase,
            discount_percent,
            discount,
            increase_percent,
            increase,
            show_values,
            show_discount,
            notes,
            store,
            panel,
            roof_orientation,
            roof_type,
            status
        } = request.body;

        const estimatesRepository = getCustomRepository(EstimatesRepository);

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id);

        const data = {
            customer,
            customer_from,
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
            energy_company,
            unity,
            kwh,
            irradiation,
            month_01,
            month_02,
            month_03,
            month_04,
            month_05,
            month_06,
            month_07,
            month_08,
            month_09,
            month_10,
            month_11,
            month_12,
            month_13,
            average_increase,
            discount_percent,
            discount,
            increase_percent,
            increase,
            show_values,
            show_discount,
            notes,
            updated_by: userCreator.name,
            updated_at: new Date(),
            store,
            panel,
            roof_orientation,
            roof_type,
            status
        };

        const schema = Yup.object().shape({
            customer: Yup.string().required(),
            customer_from: Yup.mixed().oneOf([
                'site', 'social', 'customer', 'internet', 'street'
            ]).required(),
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
            energy_company: Yup.string().notRequired(),
            unity: Yup.string().notRequired(),
            kwh: Yup.number().required(),
            irradiation: Yup.number().required(),
            month_01: Yup.number().required(),
            month_02: Yup.number().required(),
            month_03: Yup.number().required(),
            month_04: Yup.number().required(),
            month_05: Yup.number().required(),
            month_06: Yup.number().required(),
            month_07: Yup.number().required(),
            month_08: Yup.number().required(),
            month_09: Yup.number().required(),
            month_10: Yup.number().required(),
            month_11: Yup.number().required(),
            month_12: Yup.number().required(),
            month_13: Yup.number().required(),
            average_increase: Yup.number().required(),
            discount_percent: Yup.boolean().notRequired(),
            discount: Yup.number().required(),
            increase_percent: Yup.boolean().notRequired(),
            increase: Yup.number().required(),
            show_values: Yup.boolean().notRequired(),
            show_discount: Yup.boolean().notRequired(),
            notes: Yup.string().notRequired().nullable(),
            updated_by: Yup.string().required(),
            updated_at: Yup.date().required(),
            store: Yup.string().required(),
            panel: Yup.string().required(),
            roof_orientation: Yup.string().required(),
            roof_type: Yup.string().required(),
            status: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const oldEstimate = await estimatesRepository.findOne(id, {
            relations: [
                'status',
            ]
        });

        const estimate = estimatesRepository.create(data);

        await estimatesRepository.update(id, estimate);

        if (oldEstimate.status.id !== status) {
            notifications.estimateVerify(
                {
                    id,
                    stageId: status
                }
            );
        }

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "estimates", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const estimatesRepository = getCustomRepository(EstimatesRepository);

        await estimatesRepository.delete(id);

        return response.status(204).send();
    }
}