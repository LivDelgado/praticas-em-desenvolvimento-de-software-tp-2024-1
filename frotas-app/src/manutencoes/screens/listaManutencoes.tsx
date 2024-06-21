import React from 'react';
import TabelaManutencao from '../components/tabelaManutencao';
import { useNavigate } from 'react-router-dom';

export const ListaManutencoes = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Manutenções programadas</h1>
      <TabelaManutencao />

      <button onClick={() => navigate('/veiculos/novo')}>Adicionar</button>
    </div>
  );
};
