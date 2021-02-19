import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;//passa mouse por cima e token e ele te fala que é string ai coloca aqui
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        //user: objeto com todos os dados de <User>
        const user = await usersRepository.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new Error("Incorrect email/password combination.");//nao falar o que é para nao abrir brecha
        };

        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched) {
            throw new Error("Incorrect email/password combination.");
        };

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,//sempre
            expiresIn: authConfig.jwt.expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;