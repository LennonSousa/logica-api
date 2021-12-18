import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import { ProjectItemsRepository } from '../repositories/ProjectItemsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            name,
            amount,
            price,
            percent,
            order,
        } = request.body;

        const projectItemsRepository = getCustomRepository(ProjectItemsRepository);

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

        const projectItems = projectItemsRepository.create(data);

        await projectItemsRepository.update(id, projectItems);

        return response.status(204).json();
    },
}