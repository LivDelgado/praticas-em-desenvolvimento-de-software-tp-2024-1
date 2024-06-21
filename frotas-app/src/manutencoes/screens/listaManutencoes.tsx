import React from 'react';
import TabelaManutencao from '../components/tabelaManutencao';
import { useNavigate, useParams } from 'react-router-dom';

export const ListaManutencoes = () => {
  const { veiculoId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Manutenções programadas</h1>
      <TabelaManutencao />

      <button onClick={() => navigate(`/veiculos/${veiculoId}/manutencao/nova`)}>Adicionar</button>
    </div>
  );
};
