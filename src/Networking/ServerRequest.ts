import { getServerResponse, SERVER_URL } from './ServerRequestBase'

interface Order {}
interface Item {}
export interface ResultType {
    errorText?: string,
    code?: number,

    id?: number,
    image?: string,
    email?: string,
    name?: string,
    type?: string,
    adress?: string,
    phone?: string,
    token?: string,

    stars?: number,
    description?: string,
    created_date?: number,
    seller_id?: number,
    price?: number, 

    ordersFindResult?: Order[],
    itemsFindResult?: Item[]
}

export async function registrateUser(
    email : string, 
    password: string, 
    adress: string, 
    phone: string, 
    type: string, 
    name: string
) : Promise<ResultType> {
    let response : ResultType = await getServerResponse('/registrateUser.php', {
        email, 
        password, 
        adress, 
        phone, 
        type, 
        name
    })
    return response
}