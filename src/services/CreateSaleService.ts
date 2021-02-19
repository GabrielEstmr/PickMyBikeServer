
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Sale from '../models/Sale';
import SalesRepository from '../repositories/SalesRepository';

interface Request {
  date: Date;
  provider_id: string;
}

class CreateSaleService {
  public async execute({ date, provider_id }: Request): Promise<Sale> {
    const salesRepository = getCustomRepository(SalesRepository);
    const salesDate = startOfHour(date);

    const findSaleInSameDate = await salesRepository.findByDate(salesDate);

    if (findSaleInSameDate) {
      throw new Error("Sale already booked!");
    }

    //create nao é await pois : cria apenas instancia mas nao salva no DB
    const sale = salesRepository.create({
      provider_id: provider_id,
      date: salesDate
    });

    await salesRepository.save(sale);

    return sale;


  }
}

export default CreateSaleService;
