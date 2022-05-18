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