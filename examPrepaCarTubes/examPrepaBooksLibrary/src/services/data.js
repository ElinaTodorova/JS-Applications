import * as request from "../services/requester.js";
import { clearUserData, setUserData } from "./userDataSettings.js";

export async function login(email, password) {
    const result = await request.post('/users/login', {email, password});
    
    const userData = {
        email : result.email, 
        id: result._id,
        token : result.accessToken
    };

    setUserData(userData)
    return result;
}

export async function register(email, password) {
    const result = await request.post('/users/register', {email, password});

    const userData = {
        email : result.email, 
        id: result._id,
        token : result.accessToken
    }
    setUserData(userData)
    return result;
}

export async function logout() {
    request.get('/users/logout');
    clearUserData()
}

export async function getAllBooks() {
    return request.get('/data/books?sortBy=_createdOn%20desc')
}

export async function getBookById(id) {
    return request.get('/data/books/' + id)
}

export async function createBook(book) {
  return request.post('/data/books', book)
}

export async function editBook(id, book) {
    return request.put('/data/books/' + id, book)
}

export async function deleteBook(id) {
    return request.del('/data/books/' + id)
}

export async function getAllMyBooks(userId) {
    return request.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function likeBook(bookId) {
    return request.post('/data/likes', {bookId})
}

export async function getLikesByBookId(bookId) {
    return request.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)
}

export async function getMyLikeByBookId(bookId, userId) {
    return request.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}