import { api } from "../../configs/axiosConfigs";
import axios from "axios";

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

  // TODO - fix veiculo type
  update: async function (veiculo: { id: any; }) {
    await instance.patch(`/veiculos/${veiculo.id}`, veiculo);
  },

  remove: async function (id: number) {
    await instance.delete(`/veiculos/${id}`);
  },
};