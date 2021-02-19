import { Router } from 'express';


import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {

        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        // const response = await authenticateUser.execute({
        //Assim: para saber o que está respondendo
        const { user, token } = await authenticateUser.execute({
            email: email,
            password: password,
        });

        delete user.password;

        return response.json({ user, token });

    } catch (err) {

        return response.status(400).json({ error: err.message });

    }
})

export default sessionsRouter;