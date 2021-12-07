import * as request from "../services/requester.js";
import { setUserData } from "./userDataSettings.js";

export async function logout() {
    return request.get('/users/logout')
}

export async function login(email,password) {
    const result = await request.post('/users/login', { email, password });

    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
    return result;
}

export async function register(email, password) {
    const result = await request.post('/users/register', { email, password });

    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
    return result;
}

export async function getAllAlbums() {
    return request.get('/data/albums?sortBy=_createdOn%20desc&distinct=name')
}

export async function createAlbum(album) {
    return request.post('/data/albums', album)
}

export async function getAlbumById(id) {
    return request.get('/data/albums/' + id)
}

export async function deleteAlbum(id) {
    return request.del('/data/albums/' + id)
}

export async function editAlbum(id, album) {
    return request.put('/data/albums/' + id, album)
}

export async function getAlbumByName(name) {
    return request.get(`/data/albums?where=name%20LIKE%20%22${name}%22`)
}