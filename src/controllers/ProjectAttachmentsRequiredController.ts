import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import fs from 'fs';

import projectAttachmentRequiredView from '../views/projectAttachmentRequiredView';
import { ProjectAttachmentsRequiredRepository } from '../repositories/ProjectAttachmentsRequiredRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "view"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectAttachmentsRequiredRepository = getCustomRepository(ProjectAttachmentsRequiredRepository);

        const projectAttachmentRequired = await projectAttachmentsRequiredRepository.findOneOrFail(id, {
            relations: [
                'project',
            ]
        });

        const download = projectAttachmentRequiredView.renderDownload(projectAttachmentRequired);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        const { user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        let {
            name,
            received_at,
            attachmentRequired,
            project,
        } = request.body;

        const projectAttachmentsRequiredRepository = getCustomRepository(ProjectAttachmentsRequiredRepository);

        const file = request.file as Express.Multer.File;

        const data = {
            name,
            path: file.filename,
            received_at,
            attachmentRequired,
            project,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            path: Yup.string().required(),
            received_at: Yup.date().required(),
            attachmentRequired: Yup.string().required(),
            project: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectAttachmentRequired = projectAttachmentsRequiredRepository.create(data);

        await projectAttachmentsRequiredRepository.save(projectAttachmentRequired);

        return response.status(201).json(projectAttachmentRequiredView.render(projectAttachmentRequired));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        let {
            name,
            received_at,
            attachmentRequired,
        } = request.body;

        const projectAttachmentsRequiredRepository = getCustomRepository(ProjectAttachmentsRequiredRepository);

        const data = {
            name,
            received_at,
            attachmentRequired,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            received_at: Yup.date().required(),
            attachmentRequired: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectAttachmentRequired = projectAttachmentsRequiredRepository.create(data);

        await projectAttachmentsRequiredRepository.update(id, projectAttachmentRequired);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "finances", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectAttachmentsRequiredRepository = getCustomRepository(ProjectAttachmentsRequiredRepository);

        const projectAttachmentRequired = await projectAttachmentsRequiredRepository.findOneOrFail(id, {
            relations: [
                'project',
            ]
        });

        try {
            fs.rmSync(
                `${process.env.UPLOADS_DIR}/projects/${projectAttachmentRequired.project.id}/${projectAttachmentRequired.path}`, {
                maxRetries: 3
            });
        }
        catch (err) {
            console.error("> Error to remove file project attachment: ", err);
        }

        await projectAttachmentsRequiredRepository.delete(id);

        return response.status(204).send();
    }
}