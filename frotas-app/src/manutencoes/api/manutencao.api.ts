import { api } from "../../configs/axiosConfigs";
import axios from "axios";
import { Manutencao } from "../types/manutencao";

const instance = axios.create(api);

export const ManutencaoApi = {
  getAll: async function (veiculoId: number) {
    const response = await instance.get<Manutencao[]>(`veiculos/${veiculoId}/manutencoes`);
    return response.data;
  },

  update: async function (veiculoId: number, manutencao: Manutencao) {
    await instance.put(`veiculos/${veiculoId}/manutencoes/${manutencao.id}`, manutencao);
  },

  add: async function (veiculoId: number, manutencao: Manutencao) {
    await instance.post(`veiculos/${veiculoId}/manutencoes`, manutencao);
  },

  remove: async function (veiculoId: number, id: number) {
    await instance.delete(`veiculos/${veiculoId}/manutencoes/${id}`);
  },
};