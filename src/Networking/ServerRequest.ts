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
    item_id?: number,
    user_id?: number,
    finished_date?: number,
    state?: string,


    ordersFindResult?: Order[],
    findResult?: Item[],
    getResult?: any[],
    chats?: Chat[],
    chat?: Chat,
    messages? : MessageFromDB[],

    item?: Item,
    order?: Order
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

export async function findRequest(
    table: string, field: string, value: string
) : Promise<ResultType> {
    return await getServerResponse('/findRequest.php', {
        table, field, value
    })
}

export async function getRequest(
    table: string, field: string, value: string | number
) : Promise<ResultType> {
    return await getServerResponse('/getRequest.php', {
        table, field, value
    })
}

export async function registrateItem(
    stars : number,
    name : string,
    description : string,
    seller_id : number,
    price : number,
    image : string,
    items : string,
    created_date : number,
) : Promise<ResultType> {
    return await getServerResponse('/registrateItem.php ', {
        stars,
        name,
        description,
        seller_id,
        price,
        image,
        items,
        created_date
    })
}

export async function updateItem(
    id: number,
    stars : number,
    name : string,
    description : string,
    seller_id : number,
    price : number,
    image : string,
    items : string,
    created_date : number,
) : Promise<ResultType> {
    return await getServerResponse('/updateItem.php ', {
        id,
        stars,
        name,
        description,
        seller_id,
        price,
        image,
        items,
        created_date
    })
}

export async function changeOrderStateById(
    id: number,
    state : string,
) : Promise<ResultType> {
    return await getServerResponse('/changeOrderStateById.php ', {
        id,
        state,
    })
}

export async function registrateChat(
    user1: number,
    user2: number,
) : Promise<ResultType> {
    return await getServerResponse('/registrateChat.php ', {
        user1,
        user2,
    })
}

export async function registrateOrder(
    id: number | -1,
    item_id: number,
    user_id: number,
    seller_id: number, 
    created_date: number,
    state: string,
) : Promise<ResultType> {
    return await getServerResponse('/registrateOrder.php ', {
        id,
        item_id,
        user_id,
        seller_id,
        created_date,
        state,
    })
}