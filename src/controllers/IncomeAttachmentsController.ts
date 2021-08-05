import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import fs from 'fs';

import incomeAttachmentView from '../views/incomeAttachmentView';
import { IncomeAttachmentsRepository } from '../repositories/IncomeAttachmentsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const incomeAttachmentsRepository = getCustomRepository(IncomeAttachmentsRepository);

        const incomeAttachment = await incomeAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'income',
            ]
        });

        const download = incomeAttachmentView.renderDownload(incomeAttachment);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        let {
            name,
            received_at,
            income,
        } = request.body;

        const incomeAttachmentsRepository = getCustomRepository(IncomeAttachmentsRepository);

        const file = request.file as Express.Multer.File;

        const data = {
            name,
            path: file.filename,
            received_at,
            income,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            path: Yup.string().required(),
            received_at: Yup.date().required(),
            income: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const incomeAttachment = incomeAttachmentsRepository.create(data);

        await incomeAttachmentsRepository.save(incomeAttachment);

        return response.status(201).json(incomeAttachmentView.render(incomeAttachment));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        let {
            name,
            received_at,
        } = request.body;

        const incomeAttachmentsRepository = getCustomRepository(IncomeAttachmentsRepository);

        const data = {
            name,
            received_at,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            received_at: Yup.date().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const incomeAttachment = incomeAttachmentsRepository.create(data);

        await incomeAttachmentsRepository.update(id, incomeAttachment);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const incomeAttachmentsRepository = getCustomRepository(IncomeAttachmentsRepository);

        const incomeAttachment = await incomeAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'income',
            ]
        });

        try {
            fs.rmSync(
                `${process.env.UPLOADS_DIR}/incomes/${incomeAttachment.income.id}/${incomeAttachment.path}`, {
                maxRetries: 3
            });
        }
        catch (err) {
            console.error("> Error to remove file income attachment: ", err);
        }

        await incomeAttachmentsRepository.delete(id);

        return response.status(204).send();
    }
}