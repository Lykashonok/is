import { getServerResponse, SERVER_URL } from './ServerRequestBase'
import { Chat, MessageFromDB } from '../Classes/Message'
import { Item } from '../Classes/Item'
import { Order } from '../Classes/Order'

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
    findResult?: Item[],
    chats?: Chat[],
    messages? : MessageFromDB[],

    item?: Item 
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
    id: number
) : Promise<ResultType> {
    return await getServerResponse('/getMessagesById.php', {
        id
    })
}

export async function getItemInfo(
    id: number
) : Promise<ResultType> {
    return await getServerResponse('/getItemInfo.php', {
        id
    })
}

export async function sendMessage(
    chat: number, sender: number, time: number, text: string
) : Promise<ResultType> {
    return await getServerResponse('/sendMessage.php', {
        chat, sender, time, text
    })
}

export async function searchRequest(
    table: string, field: string, value: string
) : Promise<ResultType> {
    return await getServerResponse('/findRequest.php', {
        table, field, value
    })
}