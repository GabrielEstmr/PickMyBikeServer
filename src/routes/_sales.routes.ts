import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import SalesRepository from '../repositories/SalesRepository';
import CreateSaleService from '../services/CreateSaleService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const salesRouter = Router();

salesRouter.use(ensureAuthenticated);//para aplicar em todas as rotas
//se fosse uma rota só: //>>>salesRouter.get('/', ensureAuthenticated,async (request, response) => {

salesRouter.get('/', async (request, response) => {

    console.log('request.user', request.user);
    const salesRepository = getCustomRepository(SalesRepository);
    const sales = await salesRepository.find();

    return response.json(sales);
})

salesRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;
        const parsedDate = parseISO(date);
        const createSale = new CreateSaleService();

        const sale = await createSale.execute({
            date: parsedDate,
            provider_id: provider_id,
        });
        return response.json(sale);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
})

export default salesRouter;