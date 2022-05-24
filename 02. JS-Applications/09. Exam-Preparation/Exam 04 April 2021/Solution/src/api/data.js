import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const items = 'wiki';

const endPoints = {
    getAllItems: `/data/${items}?sortBy=_createdOn%20desc`,
    createItem: `/data/${items}`,
    itemById: `/data/${items}/`,

    //---LATEST-ITEMS---
    getLatestItems: `/data/${items}?sortBy=_createdOn%20desc&distinct=category`,


    //-----SEARCH-------
    search: (query) => `/data/${items}?where=title%20LIKE%20%22${query}%22`
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



//-------------LATEST-ITEMS------------
export async function getLatestItems() {
    return api.get(endPoints.getLatestItems);
}
//-------------------------------------



//---------------SEARCH----------------
export async function search(query){
    return api.get(endPoints.search(query));
}
//-------------------------------------