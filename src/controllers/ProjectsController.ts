import { Request, Response } from 'express';
import { Between, FindConditions, getCustomRepository, Like } from 'typeorm';
import * as Yup from 'yup';

import projectView from '../views/projectView';
import { ProjectsRepository } from '../repositories/ProjectsRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';
import ProjectsModel from '../models/ProjectsModel';
import notifications from '../modules/notifications';
import IncomingsModel from '../models/IncomingsModel';
import { IncomingsRepository } from '../repositories/IncomingsRepository';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const {
            start,
            end,
            limit = 10,
            page = 1,
            customer,
            store,
            status,
            user
        } = request.query;

        if (! await UsersRolesController.can(user_id, "projects", "view") &&
            ! await UsersRolesController.can(user_id, "projects", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id, {
            relations: ['store'],
        });

        const projectsRepository = getCustomRepository(ProjectsRepository);

        let whereConditions: FindConditions<ProjectsModel> = {};

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
                    seller: {
                        id: user as string,
                    },
                }
            }
        } else if (await UsersRolesController.can(user_id, "projects", "view_self")) {
            if (whereConditions) {
                whereConditions = {
                    ...whereConditions,
                    store: {
                        id: userCreator.store.id,
                    },
                    seller: {
                        id: userCreator.id,
                    },
                }
            }
            else whereConditions = {
                store: {
                    id: userCreator.store.id,
                },
                seller: {
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
                    seller: {
                        id: user as string,
                    },
                }
            }
        }

        if (status) {
            if (whereConditions) {
                whereConditions = {
                    ...whereConditions,
                    status: {
                        id: status as string,
                    }
                }
            }
            else whereConditions = {
                status: {
                    id: status as string,
                }
            };
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

        const projects: ProjectsModel[] = await projectsRepository.find({
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

        const totalItems = await projectsRepository.count({
            where: whereConditions
        });

        const totalPages = Math.ceil(totalItems / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(projectView.renderMany(projects));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view") &&
            ! await UsersRolesController.can(user_id, "projects", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const userRepository = getCustomRepository(UsersRepository);

        const userCreator = await userRepository.findOneOrFail(user_id, {
            relations: ['store'],
        });

        const projectsRepository = getCustomRepository(ProjectsRepository);

        const project = await projectsRepository.findOneOrFail(id, {
            relations: [
                'store',
                'seller',
                'status',
                'events',
                'events.event',
                'attachmentsRequired',
                'attachmentsRequired.attachmentRequired',
                'attachmentsRequired.project',
                'attachments',
                'attachments.project',
                'incomings',
                'incomings.items',
                'serviceOrders',
                'items',
            ]
        });

        if (userCreator.store_only && project.store.id !== userCreator.store.id)
            return response.status(403).send({ error: 'User permission not granted!' });

        if (await UsersRolesController.can(user_id, "projects", "view_self") &&
            project.seller &&
            project.seller.id !== userCreator.id)
            return response.status(403).send({ error: 'User permission not granted!' });

        return response.json(projectView.render(project));
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "create"))
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
            energy_company,
            unity,
            months_average,
            average_increase,
            coordinates,
            capacity,
            inversor,
            roof_orientation,
            roof_type,
            panel,
            panel_amount,
            price,
            notes,
            financier_same,
            financier,
            financier_document,
            financier_rg,
            financier_cellphone,
            financier_email,
            financier_zip_code,
            financier_street,
            financier_number,
            financier_neighborhood,
            financier_complement,
            financier_city,
            financier_state,
            store,
            status,
            events,
            items,
            incomings,
        } = request.body;

        const projectsRepository = getCustomRepository(ProjectsRepository);
        const incomingsRepository = getCustomRepository(IncomingsRepository);

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
            energy_company,
            unity,
            months_average,
            average_increase,
            coordinates,
            capacity,
            inversor,
            roof_orientation,
            roof_type,
            panel,
            panel_amount,
            price,
            notes,
            financier_same,
            financier,
            financier_document,
            financier_rg,
            financier_cellphone,
            financier_email,
            financier_zip_code,
            financier_street,
            financier_number,
            financier_neighborhood,
            financier_complement,
            financier_city,
            financier_state,
            store,
            seller: userCreator,
            status,
            events,
            items,
            created_by: userCreator.name,
            updated_by: userCreator.name,
        };

        const schema = Yup.object().shape({
            customer: Yup.string().required(),
            document: Yup.string().required(),
            phone: Yup.string().notRequired().nullable(),
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
            months_average: Yup.number().required(),
            average_increase: Yup.number().required(),
            coordinates: Yup.string().notRequired(),
            capacity: Yup.string().notRequired(),
            inversor: Yup.string().required(),
            roof_orientation: Yup.string().required(),
            roof_type: Yup.string().required(),
            panel: Yup.string().required(),
            panel_amount: Yup.number().required(),
            price: Yup.number().required(),
            notes: Yup.string().notRequired().nullable(),
            financier_same: Yup.boolean().notRequired(),
            financier: Yup.string().required(),
            financier_document: Yup.string().required(),
            financier_rg: Yup.string().notRequired().nullable(),
            financier_cellphone: Yup.string().notRequired().nullable(),
            financier_email: Yup.string().notRequired().nullable(),
            financier_zip_code: Yup.string().notRequired(),
            financier_street: Yup.string().notRequired(),
            financier_number: Yup.string().notRequired(),
            financier_neighborhood: Yup.string().notRequired(),
            financier_complement: Yup.string().notRequired().nullable(),
            financier_city: Yup.string().required(),
            financier_state: Yup.string().required(),
            created_by: Yup.string().required(),
            updated_by: Yup.string().required(),
            store: Yup.string().required(),
            status: Yup.string().required(),
            events: Yup.array(
                Yup.object().shape({
                    notes: Yup.string().notRequired(),
                    done: Yup.boolean().notRequired(),
                    done_at: Yup.date().notRequired(),
                    event: Yup.string().required(),
                })
            ),
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

        const incomeSchema = Yup.array(
            Yup.object().shape({
                description: Yup.string().required(),
                value: Yup.number().required(),
                payType: Yup.string().required(),
                items: Yup.array(
                    Yup.object().shape({
                        description: Yup.string().required(),
                        value: Yup.number().required(),
                        is_paid: Yup.boolean().notRequired(),
                        received_at: Yup.date().notRequired(),
                    })
                ),
            })
        );

        await incomeSchema.validate(incomings, {
            abortEarly: false,
        });

        const project = projectsRepository.create(data);

        await projectsRepository.save(project);

        const incomingsItems: IncomingsModel[] = incomings;

        incomingsItems.forEach(async income => {
            const newIncome = incomingsRepository.create({
                ...income,
                project: project.id as any
            });

            await incomingsRepository.save(newIncome);
        });

        notifications.newProjectVerify({ id: project.id });

        return response.status(201).json(projectView.render(project));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "update"))
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
            energy_company,
            unity,
            months_average,
            average_increase,
            coordinates,
            capacity,
            inversor,
            roof_orientation,
            roof_type,
            panel,
            panel_amount,
            price,
            notes,
            financier_same,
            financier,
            financier_document,
            financier_rg,
            financier_cellphone,
            financier_email,
            financier_zip_code,
            financier_street,
            financier_number,
            financier_neighborhood,
            financier_complement,
            financier_city,
            financier_state,
            store,
            status,
        } = request.body;

        const projectsRepository = getCustomRepository(ProjectsRepository);

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
            energy_company,
            unity,
            months_average,
            average_increase,
            coordinates,
            capacity,
            inversor,
            roof_orientation,
            roof_type,
            panel,
            panel_amount,
            price,
            notes,
            financier_same,
            financier,
            financier_document,
            financier_rg,
            financier_cellphone,
            financier_email,
            financier_zip_code,
            financier_street,
            financier_number,
            financier_neighborhood,
            financier_complement,
            financier_city,
            financier_state,
            store,
            status,
            updated_by: userCreator.name,
            updated_at: new Date(),
        };

        const schema = Yup.object().shape({
            customer: Yup.string().required(),
            document: Yup.string().required(),
            phone: Yup.string().notRequired().nullable(),
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
            energy_company: Yup.string().notRequired().nullable(),
            unity: Yup.string().notRequired().nullable(),
            months_average: Yup.number().required(),
            average_increase: Yup.number().required(),
            coordinates: Yup.string().notRequired(),
            capacity: Yup.string().notRequired(),
            inversor: Yup.string().required(),
            roof_orientation: Yup.string().required(),
            roof_type: Yup.string().required(),
            panel: Yup.string().required(),
            panel_amount: Yup.number().required(),
            price: Yup.number().required(),
            notes: Yup.string().notRequired().nullable(),
            financier_same: Yup.boolean().notRequired(),
            financier: Yup.string().required(),
            financier_document: Yup.string().required(),
            financier_rg: Yup.string().notRequired().nullable(),
            financier_cellphone: Yup.string().notRequired().nullable(),
            financier_email: Yup.string().notRequired().nullable(),
            financier_zip_code: Yup.string().notRequired(),
            financier_street: Yup.string().notRequired(),
            financier_number: Yup.string().notRequired(),
            financier_neighborhood: Yup.string().notRequired(),
            financier_complement: Yup.string().notRequired().nullable(),
            financier_city: Yup.string().required(),
            financier_state: Yup.string().required(),
            updated_by: Yup.string().required(),
            store: Yup.string().required(),
            status: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const project = projectsRepository.create(data);

        await projectsRepository.update(id, project);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectsRepository = getCustomRepository(ProjectsRepository);

        await projectsRepository.delete(id);

        return response.status(204).send();
    }
}