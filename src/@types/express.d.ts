//Modificação da Tipagem de uma biblioteca (Express no caso)
declare namespace Express {
    //Aqui: NAO É SUBSTITUIÇÃO: É UM MERGE
    export interface Request {
        user: {
            id: string;
        }
    }
}