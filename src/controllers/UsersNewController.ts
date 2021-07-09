import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UsersRepository } from '../repositories/UsersRepository';
import userView from '../views/userView';

export default {
    async show(request: Request, response: Response) {
        const { email, token } = request.query;

        const userNewRepository = getCustomRepository(UsersRepository);

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

        const userNewAuth = await userNewRepository.findOne({
            where: [
                { email, active: 0 }
            ],
            relations: ['roles']
        });

        if (!userNewAuth)
            return response.status(400).json({
                error: 'User e-mail or token dosen\'t exists.'
            });

        if (!await bcrypt.compare(token as string, userNewAuth.password))
            return response.status(400).json({
                error: 'User e-mail or token dosen\'t exists.'
            });

        if (process.env.USER_JWT_SECRET) {
            const newToken = jwt.sign({ id: userNewAuth.id }, process.env.USER_JWT_SECRET, {
                expiresIn: "1h"
            });

            return response.status(201).json({ user: userView.render(userNewAuth), token: newToken });
        }

        return response.status(500).json({ message: 'Internal server error' });
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            phone,
            password,
        } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const foundUser = await usersRepository.findOne({
            where: [
                { id }
            ]
        });

        if (!foundUser) return response.status(400).json({ error: 'User dosen\' exists!' });

        if (foundUser.active) return response.status(400).json({ error: 'User already exists and activated!' });

        const hash = await bcrypt.hash(password, 10);

        const data = {
            name,
            phone,
            password: hash,
            active: true,
            paused: false,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            phone: Yup.string().notRequired().nullable(),
            password: Yup.string().required(),
            active: Yup.boolean().required(),
            paused: Yup.boolean().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const user = usersRepository.create(data);

        await usersRepository.update(id, user);

        return response.status(204).json();
    },
}