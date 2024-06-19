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
        const fetched = await VeiculoApi.get(Number(veiculoId));
        // new Date().toISOString().substring(0, 10)
        fetched.dataAquisicao = new Date(fetched.dataAquisicao);
        setVeiculo(fetched);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVeiculo();
  }, [veiculoId]);

  const onSubmit = (data: Veiculo) => {
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
      {veiculo && <FormularioVeiculos veiculo={veiculo} onSubmit={onSubmit} />}
    </div>
  );
};

export default EdicaoVeiculo;
