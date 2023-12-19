import { backendAPI } from "./config"


export async function handlePost(event, method, api) {
    let response_data
    await fetch(`${backendAPI}` + api, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)

    })
        .then(response => response.json())
        .then(data => {
            response_data = data
            console.log("successfully posted", data)
        })
        .catch(error => {
            response_data = error
        });

    return response_data
};

export async function handleGet(api, firstValue, lastValue) {
    let response_data
    await fetch(`${backendAPI}` + api + `${firstValue}/` + `${lastValue}/`)
        .then(response => response.json())
        .then(data => {
            response_data = data
            console.log("successfully recieved get data ", data)
        })
        .catch(error => {
            response_data = error
        });

    return response_data
};



