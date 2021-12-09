import { getCustomRepository } from 'typeorm';
import { format } from 'date-fns';
import br from 'date-fns/locale/pt-BR';

import mailer from '../modules/mailer';
import { NotificationsRepository } from '../repositories/NotificationsRepository';
import { EstimatesRepository } from '../repositories/EstimatesRepository';
import { ProjectEventsRepository } from '../repositories/ProjectEventsRepository';
import ProjectEventsModel from '../models/ProjectEventsModel';
import ProjectsModel from '../models/ProjectsModel';

interface VerifyParams {
    id: string;
    stageId?: string;
}

interface NewProjectVerifyParams {
    id: string;
}

interface ProjectVerifyParams {
    id: string;
    stageId: string;
    projectEvent: ProjectEventsModel;
    project: ProjectsModel;
}

class Notifications {
    async estimateVerify({ id, stageId }: VerifyParams) {
        try {
            const notificationsRepository = getCustomRepository(NotificationsRepository);

            const notifications = await notificationsRepository.find({
                where: { stageId }
            });

            if (!!!notifications.length) return;

            const estimatesRepository = getCustomRepository(EstimatesRepository);

            const estimate = await estimatesRepository.findOne(id, {
                relations: [
                    'status',
                ]
            });

            notifications.forEach(async notification => {
                const recipients: string[] = JSON.parse(notification.recipients);

                recipients.forEach(async recipient => {
                    await mailer.sendNotification(
                        'Orçamento',
                        estimate.status.name,
                        estimate.customer,
                        format(new Date(), 'PPPPp', { locale: br }),
                        recipient,
                        `${process.env.APP_URL}/estimates/details/${id}`
                    );
                });
            });
        }
        catch (err) {
            console.log('Error to mount estiimate notifications: ', err);
        }
    }

    async newProjectVerify({ id }: NewProjectVerifyParams) {
        try {
            const projectEventsRepository = getCustomRepository(ProjectEventsRepository);

            const projectEvents = await projectEventsRepository.find({
                where: {
                    project: {
                        id
                    },
                    done: true,
                },
                relations: [
                    'project',
                    'event',
                ]
            });

            projectEvents.forEach(async projectEvent => {
                const notificationsRepository = getCustomRepository(NotificationsRepository);

                const notifications = await notificationsRepository.find({
                    where: { stageId: projectEvent.event.id }
                });

                if (!!!notifications.length) return;

                notifications.forEach(async notification => {
                    const recipients: string[] = JSON.parse(notification.recipients);

                    recipients.forEach(async item => {
                        await mailer.sendNotification(
                            'Projeto',
                            projectEvent.event.description,
                            projectEvent.project.customer,
                            format(new Date(), 'PPPPp', { locale: br }),
                            item,
                            `${process.env.APP_URL}/projects/details/${projectEvent.project.id}`
                        );
                    });
                });
            });

        }
        catch (err) {
            console.log('Error to mount new project notifications: ', err);
        }
    }

    async projectVerify({ id, stageId, projectEvent, project }: ProjectVerifyParams) {
        try {
            const notificationsRepository = getCustomRepository(NotificationsRepository);

            const notifications = await notificationsRepository.find({
                where: { stageId }
            });

            if (!!!notifications.length) return;

            notifications.forEach(async notification => {
                const recipients: string[] = JSON.parse(notification.recipients);

                recipients.forEach(async item => {
                    await mailer.sendNotification(
                        'Projeto',
                        projectEvent.event.description,
                        project.customer,
                        format(new Date(), 'PPPPp', { locale: br }),
                        item,
                        `${process.env.APP_URL}/projects/details/${id}`
                    );
                });
            });
        }
        catch (err) {
            console.log('Error to mount project notifications: ', err);
        }
    }
}

export default new Notifications();