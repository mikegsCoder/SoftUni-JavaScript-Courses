import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const items = 'games'

const endPoints = {
    getAllItems: `/data/${items}?sortBy=_createdOn%20desc`,
    getLatestItems: `/data/${items}?sortBy=_createdOn%20desc&distinct=category`,
    createItem: `/data/${items}`,
    itemById: `/data/${items}/`,
    commentsByItemId: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    commentItem: '/data/comments'
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

export async function getCommentsByItemId(gameId) {
    return api.get(endPoints.commentsByItemId(gameId))
}

export async function commentItem(gameId, comment) {
    return api.post(endPoints.commentItem, { gameId, comment })
}