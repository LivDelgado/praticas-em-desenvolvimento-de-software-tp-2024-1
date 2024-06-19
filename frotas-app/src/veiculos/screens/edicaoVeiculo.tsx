import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusVeiculo, Veiculo } from '../types/veiculo';
import { VeiculoApi } from '../api/veiculo.api';
import { FormularioVeiculos } from '../components/formularioVeiculos';

const EdicaoVeiculo = () => {
  const { veiculoId } = useParams();
  const navigate = useNavigate();

  const [veiculo, setVeiculo] = useState<Veiculo>();

  useEffect(() => {
    const fetchVeiculo = async () => {
      try {
        const response = await VeiculoApi.get(Number(veiculoId));
        setVeiculo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVeiculo();
  }, [veiculoId]);

  const onSubmit = (data: Veiculo) => {
    console.log(data);

    VeiculoApi.update({
      ...data,
      status: veiculo?.status ?? StatusVeiculo.Disponivel,
      id: Number(veiculoId)
    })
    .then(() => navigate('/veiculos'))
    .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>Editar Veículo</h1>
      <FormularioVeiculos veiculo={veiculo} onSubmit={onSubmit} />
    </div>
  );
};

export default EdicaoVeiculo;
