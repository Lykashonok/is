import { getServerResponse, SERVER_URL } from './ServerRequestBase'
import { Chat } from '../Classes/Message'

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
    chats?: Chat[]
}

export async function registrateUser(
    email : string, 
    password: string, 
    adress: string, 
    phone: string, 
    type: string, 
    name: string
) : Promise<ResultType> {
    return await getServerResponse('/registrateUser.php', {
        email, password, adress, phone, type, name
    })
}

export async function loginUser(
    email : string, 
    password: string, 
) : Promise<ResultType> {
    return await getServerResponse('/getTokenByEmailAndPassword.php', {
        email, password
    })
}

export async function getUserInfo(
    id: number
) : Promise<ResultType> {
    return await getServerResponse('/getUserInfo.php', {
        id
    })
}

export async function getChatsById(
    id: number
) : Promise<ResultType> {
    return await getServerResponse('/getChatsById.php', {
        id
    })
}

export async function getMessagesById(
    user1: number, user2: number
) : Promise<ResultType> {
    return await getServerResponse('/getMessagesById.php ', {
        user1, user2
    })
}