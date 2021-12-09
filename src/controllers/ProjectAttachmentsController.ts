import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import fs from 'fs';

import projectAttachmentView from '../views/projectAttachmentView';
import { ProjectAttachmentsRepository } from '../repositories/ProjectAttachmentsRepository';
import UsersRolesController from './UsersRolesController';

export default {
    async show(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "view") &&
            ! await UsersRolesController.can(user_id, "projects", "view_self"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

        const projectAttachment = await projectAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'project',
            ]
        });

        const download = projectAttachmentView.renderDownload(projectAttachment);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        const { user_id, id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        let {
            name,
            received_at,
            project,
        } = request.body;

        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

        const file = request.file as Express.Multer.File;

        const data = {
            name,
            path: file.filename,
            received_at,
            project,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            path: Yup.string().required(),
            received_at: Yup.date().required(),
            project: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectAttachment = projectAttachmentsRepository.create(data);

        await projectAttachmentsRepository.save(projectAttachment);

        return response.status(201).json(projectAttachmentView.render(projectAttachment));
    },

    async update(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        let {
            name,
            received_at,
        } = request.body;

        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

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

        const projectAttachment = projectAttachmentsRepository.create(data);

        await projectAttachmentsRepository.update(id, projectAttachment);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "remove"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const projectAttachmentsRepository = getCustomRepository(ProjectAttachmentsRepository);

        const projectAttachment = await projectAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'project',
            ]
        });

        try {
            fs.rmSync(
                `${process.env.UPLOADS_DIR}/projects/${projectAttachment.project.id}/${projectAttachment.path}`, {
                maxRetries: 3
            });
        }
        catch (err) {
            console.error("> Error to remove file project attachment: ", err);
        }

        await projectAttachmentsRepository.delete(id);

        return response.status(204).send();
    }
}