import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { addHours } from 'date-fns';
import mailer from '../modules/mailer';

import { UsersRepository } from '../repositories/UsersRepository';
import { UsersResetsRepository } from '../repositories/UsersResetsRepository';
import userView from '../views/userView';

export default {
    async show(request: Request, response: Response) {
        const { email, token } = request.query;

        const usersRepository = getCustomRepository(UsersRepository);

        const data = {
            email,
            token
        };

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            token: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const user = await usersRepository.findOneOrFail({
            where: [
                { email, active: 1, paused: 0 }
            ],
            relations: ['resets']
        });

        if (!!!user.resets.length)
            return response.status(400).json({
                error: 'User e-mail or token dosen\'t exists.',
                code: 'unfound',
            });



        const foundUserReset = user.resets.find(reset => { return new Date() <= reset.expire_at; });

        if (!foundUserReset) {
            return response.status(400).json({
                error: 'Expired user token!',
                code: 'expired',
            });
        }

        if (!await bcrypt.compare(token as string, foundUserReset.token))
            return response.status(400).json({
                error: 'User e-mail or token dosen\'t exists.',
                code: 'invalid',
            });

        const newToken = jwt.sign({ id: user.id }, process.env.USER_JWT_SECRET, {
            expiresIn: "1h"
        });

        const usersResetsRepository = getCustomRepository(UsersResetsRepository);

        const userResetPassword = usersResetsRepository.create({
            activated: true,
        });

        await usersResetsRepository.update(foundUserReset.id, userResetPassword);

        return response.status(201).json({ user: userView.render(user), token: newToken });
    },

    async create(request: Request, response: Response) {
        const {
            email
        } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const data = {
            email,
        };

        // Validation fields.
        const schema = Yup.object().shape({
            email: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        // If user exists and is activated and unpaused.
        const foundUser = await usersRepository.findOneOrFail({
            where: [
                { email, active: 1, paused: 0 }
            ],
            relations: ['resets'],
        });

        // If user exists and activated.
        const usersResetsRepository = getCustomRepository(UsersResetsRepository);

        const tempPassword = crypto.randomBytes(10).toString('hex');
        const hash = await bcrypt.hash(tempPassword, 10);

        const expire_at = addHours(new Date(), 6);

        foundUser.resets.forEach(async reset => {
            await usersRepository.delete(reset.id);
        });

        const userResetPassword = usersResetsRepository.create({
            token: hash,
            expire_at,
            activated: false,
            user: foundUser
        });

        await usersResetsRepository.save(userResetPassword);

        try {
            await mailer.sendUserResetPassword(
                foundUser.name,
                foundUser.email,
                `${process.env.APP_URL}/users/reset/auth?email=${email}&token=${tempPassword}`
            ).then(() => {
                return response.status(201).json();
            });
        }
        catch (err) {
            return response.status(500).json({ message: 'Internal server error' });
        }
    },

    async update(request: Request, response: Response) {
        const { user_id, id } = request.params;

        const {
            password,
        } = request.body;

        const usersResetsRepository = getCustomRepository(UsersResetsRepository);

        const foundUserReset = await usersResetsRepository.findOneOrFail({
            where: [
                { user: id, activated: 1 }
            ],
            relations: [
                'user',
                'user.resets',
            ],
        });

        if (foundUserReset.user.id !== user_id) return response.status(403).json({ error: 'Not authorized!' });

        const hash = await bcrypt.hash(password, 10);

        const data = {
            password: hash,
        };

        const schema = Yup.object().shape({
            password: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const usersRepository = getCustomRepository(UsersRepository);

        const user = usersRepository.create(data);

        await usersRepository.update(foundUserReset.user.id, user);

        foundUserReset.user.resets.forEach(async reset => {
            await usersResetsRepository.delete(reset.id);
        });

        try {
            await mailer.sendUserConfirmedResetPassword(
                foundUserReset.user.name,
                foundUserReset.user.email,
            ).then(() => {
                return response.status(204).json();
            });
        }
        catch (err) {
            return response.status(500).json({ message: 'Internal server error' });
        }
    },
}