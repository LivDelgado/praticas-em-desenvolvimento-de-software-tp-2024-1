import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Manutencao } from '../types/manutencao';
import { ManutencaoApi } from '../api/manutencao.api';
import { FormularioManutencao } from '../components/formularioManutencao';

const CriacaoManutencao = () => {
  const { veiculoId } = useParams();
  const navigate = useNavigate();

  const [manutencao] = useState<Manutencao>();

  const onSubmit = (data: Manutencao) => {
    ManutencaoApi.add(Number(veiculoId), data)
      .then(() => navigate(`/veiculos/${veiculoId}/manutencao`))
      .catch((error) => {
        window.alert(error.response.data);
      });
  }

  return (
    <div>
      <h1>Adicionar Manutenção</h1>
      <FormularioManutencao manutencao={manutencao} onSubmit={onSubmit} />
    </div>
  );
};

export default CriacaoManutencao;
