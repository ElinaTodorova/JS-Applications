import { getUserData } from "./userDataSettings.js";

const hostname = 'http://localhost:3030';

async function request(url, options) {
    try{
        const response = await fetch(hostname + url, options);

        if(response.ok == false) {
            const error = await response.json();
            throw new Error(error.message)
        }

        try {
            return await response.json()
        }catch {
            return response
        }
    }catch(err) {
        alert(err.message);
        throw err;
    }
}

function createOption(method = 'get', data) {
    const options = {
        method,
        headers :{}
    };

    if(data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data)
    };

    const userData = getUserData();

    if(userData) {
        options.headers['X-Authorization'] = userData.token
    };

    return options
};

export async function get(url) {
    return request(url, createOption())
};

export async function post(url, data) {
    return request(url, createOption('post', data))
};

export async function put(url, data) {
    return request(url, createOption('put', data))
}

export async function del(url) {
    return request(url, createOption('delete'))
}