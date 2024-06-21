import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Veiculo } from '../types/veiculo';
import { VeiculoApi } from '../api/veiculo.api';
import { FormularioVeiculos } from '../components/formularioVeiculos';

const CriacaoVeiculo = () => {
  const navigate = useNavigate();

  const [veiculo] = useState<Veiculo>();

  const onSubmit = (data: Veiculo) => {
    VeiculoApi.add(data)
    .then(() => navigate('/veiculos'))
    .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>Adicionar Veículo</h1>
      <FormularioVeiculos veiculo={veiculo} onSubmit={onSubmit} />
    </div>
  );
};

export default CriacaoVeiculo;
