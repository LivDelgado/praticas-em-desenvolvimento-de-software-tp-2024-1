import { Dayjs } from "dayjs";

export type Veiculo = {
    id: number;
    montadora: string;
    modelo: string;
    ano: string;
    dataAquisicao: Dayjs;
    nextManutencaoDate: Date;
    status: StatusVeiculo;
}

export enum StatusVeiculo {
    Disponivel = 'DISPONÍVEL',
    EmManutencao = 'EM MANUTENÇÃO',
    Alocado = 'ALOCADO'
}