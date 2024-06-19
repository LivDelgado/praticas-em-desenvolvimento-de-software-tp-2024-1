import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusVeiculo, Veiculo } from '../types/veiculo';
import { VeiculoApi } from '../api/veiculo.api';

const EdicaoVeiculo = () => {
  const { veiculoId } = useParams();
  const navigate = useNavigate();

  const [veiculo, setVeiculo] = useState<Veiculo>();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: veiculo
  });


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
      <form onSubmit={handleSubmit(onSubmit)}>

      <label htmlFor="montadora">Montadora</label>
      <input id="montadora" {...register('montadora', { required: true })} />
      {errors.montadora && <span>Preenchimento obrigatório</span>}

      <label htmlFor="modelo">Modelo</label>
      <input id="modelo" {...register('modelo', { required: true })} />
      {errors.modelo && <span>Preenchimento obrigatório</span>}

      <label htmlFor="ano">Ano</label>
      <input id="ano" {...register('ano', { required: true })} />
      {errors.ano && <span>Preenchimento obrigatório</span>}

      <label htmlFor="dataAquisicao">Data de aquisição</label>
      <input id="dataAquisicao" type="date" {...register('dataAquisicao', { required: true })} />
      {errors.dataAquisicao && <span>Preenchimento obrigatório</span>}

      {/* <label htmlFor="motorista">Motorista</label>
      <input id="motorista" {...register('motorista', { required: true })} />
      {errors.motorista && <span>Preenchimento obrigatório</span>} */}

      {/* <label htmlFor="proximaManutencao">Próxima manutenção</label>
      <input id="proximaManutencao" type="date" {...register('proximaManutencao', { required: true })} />
      {errors.proximaManutencao && <span>Preenchimento obrigatório</span>} */}

      <input type="submit" value="Create" />
    </form>
    </div>
  );
};

export default EdicaoVeiculo;
