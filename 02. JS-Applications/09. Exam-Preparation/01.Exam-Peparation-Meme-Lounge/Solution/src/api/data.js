import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const items = 'memes'

const endPoints = {
    getAllItems: `/data/${items}?sortBy=_createdOn%20desc`,
    getMyItems: (userId) => `/data/${items}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    createItem: `/data/${items}`,
    itemById: `/data/${items}/`,
    // likeItem: '/data/likes',
    // getLikesById: (theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    // getMyLikeById: (theaterId, userId) => `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
    // commentsByItemId: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    // commentItem: '/data/comments'
    // getLatestItems: `/data/${items}?sortBy=_createdOn%20desc&distinct=category`,
    // search: (query) => `/data/cars?where=year%3D${query}`
}

export async function getAllItems() {
    return api.get(endPoints.getAllItems);
}

//----------------CRUD-----------------
export async function getItemById(id) {
    return api.get(endPoints.itemById + id);
}

export async function createItem(item) {
    return api.post(endPoints.createItem, item);
}

export async function editItem(id, item) {
    return api.put(endPoints.itemById + id, item);
}

export async function deleteItem(id) {
    return api.del(endPoints.itemById + id);
}
//-------------------------------------

//---------------MY-ITEMS--------------
export async function getMyItems(userId) {
    return api.get(endPoints.getMyItems(userId));
}
//-------------------------------------

//-------------LATEST-ITEMS------------
// export async function getLatestItems() {
//     return api.get(endPoints.getLatestItems);
// }
//-------------------------------------

//---------------COMMENT---------------
// export async function getCommentsByItemId(gameId) {
//     return api.get(endPoints.commentsByItemId(gameId))
// }

// export async function commentItem(gameId, comment) {
//     return api.post(endPoints.commentItem, { gameId, comment })
// }
//-------------------------------------

//----------------LIKE----------------
// export async function likeItem(theaterId) {
//     return api.post(endPoints.likeItem, { theaterId });
// }

// export async function getLikesByItemId(theaterId) {
//     return api.get(endPoints.getLikesById(theaterId));
// }

// export async function getMyLikeByItemId(theaterId, userId) {
//     return api.get(endPoints.getMyLikeById(theaterId, userId));
// }
//-------------------------------------

//---------------SEARCH----------------
// export async function search(query){
//     return api.get(endPoints.search(query));
// }
//-------------------------------------