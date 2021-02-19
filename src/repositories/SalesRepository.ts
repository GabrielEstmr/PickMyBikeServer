import { EntityRepository, Repository } from 'typeorm';

import Sale from '../models/Sale';

@EntityRepository(Sale)
class SaleRepository extends Repository<Sale>{
    public async findByDate(date: Date): Promise<Sale | null> {

        const findSale = await this.findOne({
            where: { date: date },
        });

        return findSale || null;
    }

}


export default SaleRepository;