import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import fs from 'fs';

import noteAttachmentView from '../views/noteAttachmentView';
import { NoteAttachmentsRepository } from '../repositories/NoteAttachmentsRepository';

export default {
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const noteAttachmentsRepository = getCustomRepository(NoteAttachmentsRepository);

        const noteAttachment = await noteAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'note',
            ]
        });

        const download = noteAttachmentView.renderDownload(noteAttachment);

        return response.download(download.path);
    },

    async create(request: Request, response: Response) {
        const {
            title,
            note,
        } = request.body;

        const noteAttachmentsRepository = getCustomRepository(NoteAttachmentsRepository);

        const file = request.file as Express.Multer.File;

        const data = {
            title,
            path: file.filename,
            note,
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            path: Yup.string().required(),
            note: Yup.string().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const noteAttachment = noteAttachmentsRepository.create(data);

        await noteAttachmentsRepository.save(noteAttachment);

        return response.status(201).json(noteAttachmentView.render(noteAttachment));
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            title,
        } = request.body;

        const noteAttachmentsRepository = getCustomRepository(NoteAttachmentsRepository);

        const data = {
            title,
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const noteAttachments = noteAttachmentsRepository.create(data);

        await noteAttachmentsRepository.update(id, noteAttachments);

        return response.status(204).json();
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const noteAttachmentsRepository = getCustomRepository(NoteAttachmentsRepository);

        const noteAttachment = await noteAttachmentsRepository.findOneOrFail(id, {
            relations: [
                'note',
            ]
        });

        try {
            fs.rmSync(
                `${process.env.UPLOADS_DIR}/notes/${noteAttachment.note.id}/${noteAttachment.path}`, {
                maxRetries: 3
            });
        }
        catch (err) {
            console.error("> Error to remove file note attachment: ", err);
        }

        await noteAttachmentsRepository.delete(id);

        return response.status(204).send();
    }
}