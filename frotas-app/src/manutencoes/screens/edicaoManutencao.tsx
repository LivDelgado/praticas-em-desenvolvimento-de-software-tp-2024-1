import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Manutencao } from '../types/manutencao';
import { ManutencaoApi } from '../api/manutencao.api';
import { FormularioManutencao } from '../components/formularioManutencao';

const EdicaoManutencao = () => {
  const { veiculoId, manutencaoId } = useParams();
  const navigate = useNavigate();

  const [manutencao, setManutencao] = useState<Manutencao>();

  useEffect(() => {
    const fetchManutencao = async () => {
      try {
        const manutencoesVeiculo = await ManutencaoApi.getAll(Number(veiculoId));
        const manutencao = manutencoesVeiculo.filter((it) => it.id === Number(manutencaoId))?.[0] as Manutencao;
        setManutencao(manutencao);
      } catch (error) {
        console.error(error);
      }
    };

    fetchManutencao();
  }, [veiculoId, manutencaoId]);


  const onSubmit = (data: Manutencao) => {
    ManutencaoApi.update(Number(veiculoId), {
      ...data,
      id: Number(manutencaoId)
    })
      .then(() => navigate(`/veiculos/${veiculoId}/manutencao`))
      .catch((error) => {
        window.alert(error.response.data);
      });
  }

  return (
    <div>
      <h1>Editar Manutenção</h1>
      {manutencao && <FormularioManutencao manutencao={manutencao} onSubmit={onSubmit} />}
    </div>
  );
};

export default EdicaoManutencao;
