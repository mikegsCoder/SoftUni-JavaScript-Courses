import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endPoints = {
    getAllCars: '/data/cars?sortBy=_createdOn%20desc',
    getMyCars: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    createCar: '/data/cars',
    carById: '/data/cars/',
    search: (query) => `/data/cars?where=year%3D${query}`
}

export async function getAllCars() {
    return api.get(endPoints.getAllCars);
}

export async function getMyCars(userId) {
    return api.get(endPoints.getMyCars(userId));
}

export async function createCar(car) {
    return api.post(endPoints.createCar, car);
}

export async function getCarById(id) {
    return api.get(endPoints.carById + id);
}

export async function editCar(id, car) {
    return api.put(endPoints.carById + id, car);
}

export async function deleteCar(id) {
    return api.del(endPoints.carById + id);
}

export async function search(query) {
    return api.get(endPoints.search(query));
}