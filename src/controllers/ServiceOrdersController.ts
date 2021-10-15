import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import serviceOrderView from '../views/serviceOrderView';
import { ServiceOrdersRepository } from '../repositories/ServiceOrdersRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async index(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceOrdersRepository = getCustomRepository(ServiceOrdersRepository);

        const serviceOrders = await serviceOrdersRepository.find();

        return response.json(serviceOrderView.renderMany(serviceOrders));
    },

    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "services", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const serviceOrdersRepository = getCustomRepository(ServiceOrdersRepository);

        const serviceOrder = await serviceOrdersRepository.findOneOrFail(id, {
            relations: [
                'project',
            ]
        });

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
            technical,
            start_at,
            finish_at,
            project,
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
            technical,
            start_at,
            finish_at,
            project,
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
            technical: Yup.string().required(),
            start_at: Yup.date().notRequired(),
            finish_at: Yup.date().notRequired(),
            project: Yup.string().required(),
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
            technical,
            start_at,
            finish_at,
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
            technical,
            start_at,
            finish_at,
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
            technical: Yup.string().required(),
            start_at: Yup.date().notRequired(),
            finish_at: Yup.date().notRequired(),
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