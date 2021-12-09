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

        if (! await UsersRolesController.can(user_id, "projects", "view") &&
            ! await UsersRolesController.can(user_id, "projects", "view_self"))
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

        if (! await UsersRolesController.can(user_id, "projects", "create"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            received_at,
            attachmentRequired,
            project,
        } = request.body;

        const projectAttachmentsRequiredRepository = getCustomRepository(ProjectAttachmentsRequiredRepository);

        if (request.file) {
            const file = request.file as Express.Multer.File;

            const data = {
                path: file.filename,
                received_at,
                attachmentRequired,
                project,
            };

            const schema = Yup.object().shape({
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
        }

        const data = {
            received_at,
            attachmentRequired,
            project,
        };

        const schema = Yup.object().shape({
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
        const { aid, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "update"))
            return response.status(403).send({ error: 'User permission not granted!' });

        const {
            received_at,
        } = request.body;

        const projectAttachmentsRequiredRepository = getCustomRepository(ProjectAttachmentsRequiredRepository);

        if (request.file) {
            const file = request.file as Express.Multer.File;

            const data = {
                path: file.filename,
                received_at,
            };

            const schema = Yup.object().shape({
                path: Yup.string().required(),
                received_at: Yup.date().required(),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const projectAttachmentRequired = projectAttachmentsRequiredRepository.create(data);

            await projectAttachmentsRequiredRepository.update(aid, projectAttachmentRequired);

            return response.status(204).json();
        }

        const data = {
            received_at,
        };

        const schema = Yup.object().shape({
            received_at: Yup.date().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const projectAttachmentRequired = projectAttachmentsRequiredRepository.create(data);

        await projectAttachmentsRequiredRepository.update(aid, projectAttachmentRequired);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id, user_id } = request.params;

        if (! await UsersRolesController.can(user_id, "projects", "remove"))
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

        const data = {
            path: null,
        };

        const updatedProjectAttachmentRequired = projectAttachmentsRequiredRepository.create(data);

        await projectAttachmentsRequiredRepository.update(id, updatedProjectAttachmentRequired);

        return response.status(204).send();
    }
}