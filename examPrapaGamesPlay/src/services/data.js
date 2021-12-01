import * as request from "../services/requester.js"
import { clearUserData, setUserData } from "./userDataSettings.js";


export async function login(email, password) {

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
    };
    setUserData(userData)
    return result;

}

export async function logout() {
    return request.get('/users/logout')
  
}

export async function homePageGames() {
    return request.get('/data/games?sortBy=_createdOn%20desc&distinct=category')
}

export async function getAllGames() {
    return request.get('/data/games?sortBy=_createdOn%20desc')
}

export async function createGame(game) {
    return request.post('/data/games', game)
}

export async function getGameById(id) {
    return request.get('/data/games/' + id)
}

export async function editGame(id, game) {
    return request.put('/data/games/' + id, game)
}

export function deleteGame(id) {
    return request.del('/data/games/' + id)
};

export async function createCommentGame(comment) {
    return request.post('/data/comments', comment)
};

export async function getCommentsByGameId(gameId) {
    return request.get(`/data/comments?where=gameId%3D%22${gameId}%22`)
}

