import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const items = 'pets';

const endPoints = {
    getAllItems: `/data/${items}?sortBy=_createdOn%20desc`,
    createItem: `/data/${items}`,
    itemById: `/data/${items}/`,

    //-----My-ITEMS-----
    getMyItems: (userId) => `/data/${items}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,

    //------LIKES-------
    likeItem: '/data/likes',
    getLikesById: (petId) => `/data/likes?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    getMyLikeById: (petId, userId) => `/data/likes?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`

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

//----------------LIKE----------------
export async function likeItem(petId) {
    return api.post(endPoints.likeItem, { petId });
}

export async function getLikesByItemId(petId) {
    return api.get(endPoints.getLikesById(petId));
}

export async function getMyLikeByItemId(petId, userId) {
    return api.get(endPoints.getMyLikeById(petId, userId));
}
//-------------------------------------