import { api } from "../../configs/axiosConfigs";
import axios from "axios";
import { Motorista } from "../types/motorista";

const instance = axios.create(api);

export const MotoristaApi = {
    getAll: async function () {
        const response = await instance.get<Motorista[]>("/motoristas");
        return response.data;
    },

    get: async function (id: number) {
        const response = await instance.get<Motorista>(`/motoristas/${id}`);
        return response.data;
    },

    update: async function (motorista: Motorista) {
        await instance.put(`/motoristas/${motorista.id}`, motorista);
    },

    add: async function (motorista: Motorista) {
        await instance.post('/motoristas', motorista);
    },

    remove: async function (id: number) {
        await instance.delete(`/motoristas/${id}`);
    },
};