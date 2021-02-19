//Middleware: (request, response,next)

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: string;
    sub: string;
}

//IMPORTANTE: o que incluir em Request e Response de Middleware estará disponível pelas rotas que usam o Middleware
export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    //Validação Token JWT
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("JWT token is missing!");
    }

    //Bearer
    const [, token] = authHeader.split(' ');
    try {
        const decoded = verify(token, authConfig.jwt.secret)
        console.log(decoded)

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        }

        return next();
    } catch {
        throw new Error("Invalid JWT Token!");
    }

}