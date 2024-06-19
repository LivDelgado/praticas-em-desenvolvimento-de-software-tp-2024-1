import React from 'react';
import VehicleTable from '../components/tabelaVeiculos';
import { useNavigate } from 'react-router-dom';

export const ListaVeiculos = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Veículos</h1>
      <VehicleTable />

      <button onClick={() => navigate('/veiculos/novo')}>Adicionar</button>
    </div>
  );
};
