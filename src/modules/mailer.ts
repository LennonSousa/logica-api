import nodemailer, { Transporter } from 'nodemailer';
import { resolve } from 'path';
import handlebars from 'handlebars';
import fs from 'fs';
import { getYear } from 'date-fns';

require('dotenv/config');

export interface DocumentsProps {
    item: string;
    document: string;
}

export interface DocumentsListProps {
    item: string;
    document: string;
}

class Mailer {
    private client: Transporter;

    constructor() {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });

        this.client = transporter;
    }

    private async execute(to: string, subject: string, variables: object, hbsTemplatePath: string, text: string) {
        const hbsTemplate = fs.readFileSync(hbsTemplatePath).toString("utf-8");

        const mailTemplateParse = handlebars.compile(hbsTemplate);

        const html = mailTemplateParse(variables);

        await this.client.sendMail({
            to,
            subject,
            html,
            text,
            from: `${process.env.STORE_NAME} ${process.env.EMAIL_USER}`,
        });
    }

    async sendNotification(
        groupName: string,
        stageName: string,
        customerName: string,
        updatedAt: string,
        email: string,
        link: string
    ) {
        const variables = {
            store_name: process.env.STORE_NAME,
            group_name: groupName,
            stage_name: stageName,
            customer_name: customerName,
            updated_at: updatedAt,
            link,
            current_year: getYear(new Date()),
        }

        const templatePath = resolve(__dirname, "..", "views", "emails", "notification.hbs");

        const text = `Novo ${groupName} atualizado.`;

        await this.execute(email, "Você tem uma nova notificação.", variables, templatePath, text).then(() => {
            return true;
        }).catch(err => {
            console.log('Error to send notification e-mail: ', err);
            return false
        });
    }

    async sendNewUserEmail(name: string, email: string, link: string) {
        const variables = {
            name,
            store_name: process.env.STORE_NAME,
            link,
            current_year: getYear(new Date()),
        }

        const templatePath = resolve(__dirname, "..", "views", "emails", "newUser.hbs");

        const text = `Bem-vindo a plataforma gerenciamento ${process.env.STORE_NAME}.`;

        await this.execute(email, "Bem-vindo(a).", variables, templatePath, text).then(() => {
            return true;
        }).catch(err => {
            console.log('Error to send new user e-mail: ', err);
            return false
        });
    }

    async sendUserResetPassword(name: string, email: string, link: string) {
        const variables = {
            store_name: process.env.STORE_NAME,
            name,
            link,
            current_year: getYear(new Date()),
        }

        const templatePath = resolve(__dirname, "..", "views", "emails", "resetUserPassword.hbs");

        const text = `Recebemos a sua solicitação para trocar a sua senha.`;

        await this.execute(email, "Recuperação de senha.", variables, templatePath, text).then(() => {
            return true;
        }).catch(err => {
            console.log('Error to send reset user e-mail: ', err);
            return false
        });
    }

    async sendUserConfirmedResetPassword(name: string, email: string) {
        const variables = {
            store_name: process.env.STORE_NAME,
            name,
            current_year: getYear(new Date()),
        }

        const templatePath = resolve(__dirname, "..", "views", "emails", "confirmedResetUserPassword.hbs");

        const text = `A sua senha de acesso ao aplicativo foi alterada.`;

        await this.execute(email, "Senha alterada.", variables, templatePath, text).then(() => {
            return true;
        }).catch(err => {
            console.log('Error to send confirmed user e-mail: ', err);
            return false
        });
    }
}

export default new Mailer();