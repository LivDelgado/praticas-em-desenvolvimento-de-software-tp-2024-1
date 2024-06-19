import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusVeiculo, Veiculo } from '../types/veiculo';
import { VeiculoApi } from '../api/veiculo.api';
import { FormularioVeiculos } from '../components/formularioVeiculos';

const CriacaoVeiculo = () => {
  const navigate = useNavigate();

  const [veiculo] = useState<Veiculo>();

  const onSubmit = (data: Veiculo) => {
    console.log(data);

    VeiculoApi.add({
      ...data,
      status: veiculo?.status ?? StatusVeiculo.Disponivel
    })
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
