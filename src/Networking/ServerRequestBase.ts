export const SERVER_URL = 'https://vishop-server.000webhostapp.com/'

function timeout(time: number, promise: Promise<any>)
{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Timeout error!"));
        }, time);
        promise.then(resolve, reject);
    });
}

export async function getServerResponse(url: string, body: object){
    console.log('serverResponse start');
    console.log('body and url:',body, SERVER_URL + url)
    let result = {}

    await timeout(5000, fetch(SERVER_URL + url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }))
    .then((response:any) => response.json())
    .then(response => {
        result = response
    })
    .catch((error) => {
        throw "Время ожидания подключения истекло"
    })
    console.log('response:',result)
    console.log('serverResponse end');
    return result
}