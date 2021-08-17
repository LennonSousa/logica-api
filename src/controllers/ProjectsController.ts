import { Request, Response } from 'express';
import { Between, getCustomRepository, Like } from 'typeorm';
import * as Yup from 'yup';

import projectView from '../views/projectView';
import { ProjectsRepository } from '../repositories/ProjectsRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import UsersRolesController from './UsersRolesController';
import ProjectsModel from '../models/ProjectsModel';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;
        const { start, end, limit = 10, page = 1, name, user } = request.query;

        if (! await UsersRolesController.can(user_id, "projects", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectsRepository = getCustomRepository(ProjectsRepository);

        let projects: ProjectsModel[] = [];

        if (start && end) {
            projects = await projectsRepository.find({
                where: { updated_at: Between(start, end) },
                relations: [
                    'status',
                ],
                order: {
                    updated_at: "DESC"
                },
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            });

            const totalPages = Math.ceil(projects.length / Number(limit));

            response.header('X-Total-Pages', String(totalPages));

            return response.json(projectView.renderMany(projects));
        }

        if (name) {
            projects = await projectsRepository.find({
                where: { name: Like(`%${name}%`) },
                relations: [
                    'status',
                ],
                order: {
                    created_at: "DESC"
                },
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            });

            const totalPages = Math.ceil(projects.length / Number(limit));

            response.header('X-Total-Pages', String(totalPages));

            return response.json(projectView.renderMany(projects));
        }

        if (user) {
            projects = await projectsRepository.find({
                where: { user: Like(`%${user}%`) },
                relations: [
                    'status',
                ],
                order: {
                    updated_at: "DESC"
                },
                take: Number(limit),
                skip: ((Number(page) - 1) * Number(limit)),
            });

            const totalPages = Math.ceil(projects.length / Number(limit));

            response.header('X-Total-Pages', String(totalPages));

            return response.json(projectView.renderMany(projects));
        }

        projects = await projectsRepository.find({
            relations: [
                'status',
            ],
            order: {
                updated_at: "DESC"
            },
            take: Number(limit),
            skip: ((Number(page) - 1) * Number(limit)),
        });

        const totalPages = Math.ceil(projects.length / Number(limit));

        response.header('X-Total-Pages', String(totalPages));

        return response.json(projectView.renderMany(projects));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectsRepository = getCustomRepository(ProjectsRepository);

        const project = await projectsRepository.findOneOrFail(id, {
            relations: [
                'seller',
                'status',
                'events',
                'events.event',
                'attachmentsRequired',
                'attachmentsRequired.attachmentRequired',
                'attachmentsRequired.project',
                'attachments',
                'attachments.project',
            ]
        });

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
            coordinates,
            capacity,
            inversor,
            roof_orientation,
            roof_type,
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
            status,
            events
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
            coordinates,
            capacity,
            inversor,
            roof_orientation,
            roof_type,
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
            seller: userCreator,
            status,
            events,
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
            coordinates: Yup.string().notRequired(),
            capacity: Yup.string().notRequired(),
            inversor: Yup.string().required(),
            roof_orientation: Yup.string().required(),
            roof_type: Yup.string().required(),
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
            status: Yup.string().required(),
            events: Yup.array(
                Yup.object().shape({
                    notes: Yup.string().notRequired(),
                    done: Yup.boolean().notRequired(),
                    done_at: Yup.date().notRequired(),
                    event: Yup.string().required(),
                })
            ),
            incomings: Yup.array(
                Yup.object().shape({
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
                })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const project = projectsRepository.create(data);

        await projectsRepository.save(project);

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
            coordinates,
            capacity,
            inversor,
            roof_orientation,
            roof_type,
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
            coordinates,
            capacity,
            inversor,
            roof_orientation,
            roof_type,
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
            coordinates: Yup.string().notRequired(),
            capacity: Yup.string().notRequired(),
            inversor: Yup.string().required(),
            roof_orientation: Yup.string().required(),
            roof_type: Yup.string().required(),
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