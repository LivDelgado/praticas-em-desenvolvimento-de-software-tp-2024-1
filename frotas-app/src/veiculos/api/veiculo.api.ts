import { api } from "../../configs/axiosConfigs";
import axios from "axios";
import { Veiculo } from "../types/veiculo";

const instance = axios.create(api);

export const VeiculoApi = {
  getAll: async function () {
    const response = await instance.get("/veiculos");
    return response.data;
  },

  get: async function (id: number) {
    const response = await instance.get(`/veiculos/${id}`);
    return response.data;
  },

  update: async function (veiculo: Veiculo) {
    await instance.put(`/veiculos/${veiculo.id}`, veiculo);
  },

  add: async function (veiculo: Veiculo) {
    await instance.post('/veiculos', veiculo);
  },

  remove: async function (id: number) {
    await instance.delete(`/veiculos/${id}`);
  },
};