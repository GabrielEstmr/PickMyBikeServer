import { Router } from 'express';
import salesRouter from './_sales.routes';
import usersRouter from './_users.routes';
import sessionsRouter from './_sessions.routes';

const routes = Router();

routes.use('/sales', salesRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;