import * as request from './requester.js';
import { clearUserData, setUserData } from './userData.js';

export async function login(username, password) {
    const result = await request.post('/users/login', {username, password});
   
    const userData = {
        username : result.username, 
        id: result._id,
        token : result.accessToken
    };

   
    setUserData(userData);
    return result

};

export async function register(username, password) {
    const result = await request.post('/users/register', {username, password});
   
    const userData = {
        username : result.username, 
        id: result._id,
        token : result.accessToken
    };

   
    setUserData(userData);
    return result;
}

export async function logout() {
    request.get('/users/logout');
    clearUserData()
}

export async function getAllCars() {
    return request.get('/data/cars?sortBy=_createdOn%20desc')
}

export async function getCarById(id) {
    return request.get('/data/cars/' + id)
}

export async function createCar(car) {
    return request.post('/data/cars', car)
}

export async function deleteCar(id) {
    return request.del('/data/cars/' + id)
}

export async function editCar(id, car) {
    return request.put('/data/cars/' + id, car)
}

export async function getMyCars(userId) {
    return request.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function getCarByYear(year) {
    return request.get(`/data/cars?where=year%3D${year}`)
}
