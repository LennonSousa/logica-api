import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";

export default (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        return response.status(401).send({ error: 'No token provided user auth' });

    const parts = authHeader.split(' ');

    if (parts.length !== 2)
        return response.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return response.status(401).send({ error: 'Token malformated' });

    if (process.env.USER_JWT_SECRET) {
        jwt.verify(token, process.env.USER_JWT_SECRET, (err: any, decoded: any) => {
            if (err) return response.status(401).send({ error: 'Token invalid  user auth', err });

            request.params['user_id'] = decoded.id;

            return next();
        });
    }
};