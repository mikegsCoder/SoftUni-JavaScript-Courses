import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const items = 'theaters'

const endPoints = {
    getAllItems: `/data/${items}?sortBy=_createdOn%20desc&distinct=title`,
    getMyItems: (userId) => `/data/${items}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    createItem: `/data/${items}`,
    itemById: `/data/${items}/`,
    likeItem: '/data/likes',
    getLikesById: (theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    getMyLikeById: (theaterId, userId) => `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function getAllItems() {
    return api.get(endPoints.getAllItems);
}

export async function getLatestItems() {
    return api.get(endPoints.getLatestItems);
}

export async function createItem(item) {
    return api.post(endPoints.createItem, item);
}

export async function getItemById(id) {
    return api.get(endPoints.itemById + id);
}

export async function editItem(id, item) {
    return api.put(endPoints.itemById + id, item);
}

export async function deleteItem(id) {
    return api.del(endPoints.itemById + id);
}

export async function likeItem(theaterId) {
    return api.post(endPoints.likeItem, { theaterId });
}

export async function getLikesByItemId(theaterId) {
    return api.get(endPoints.getLikesById(theaterId));
}

export async function getMyLikeByItemId(theaterId, userId) {
    return api.get(endPoints.getMyLikeById(theaterId, userId));
}

export async function getMyItems(userId) {
    return api.get(endPoints.getMyItems(userId));
}