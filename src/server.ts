console.clear()

import 'reflect-metadata';

import express from 'express';
import routes from './routes/index';
import './database/index';

const app = express();

app.use(express.json());//para que as apis entenda o formato JSON nas requisições (BODY)
app.use(routes);


app.listen(3333, () => {
    console.log('Server started on port 3333!');
})






// saber se precisa de await ou nao: passar mouse por cime e ver se retorna uma promise