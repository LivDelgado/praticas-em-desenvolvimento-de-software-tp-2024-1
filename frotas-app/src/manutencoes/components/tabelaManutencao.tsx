import React, { useState, useEffect } from 'react';
import { ManutencaoApi } from '../api/manutencao.api';
import { Manutencao } from '../types/manutencao';
import { useNavigate, useParams } from 'react-router-dom';

function TabelaManutencao() {
  const { veiculoId } = useParams();
  const [manutencoes, setManutencaos] = useState<Manutencao[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchManutencoes();
  }, []);

  const fetchManutencoes = async () => {
    try {
      const manutencoes = await ManutencaoApi.getAll(Number(veiculoId));
      setManutencaos(manutencoes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (manutencao: Manutencao) => {
    navigate(`/manutencoes/${manutencao.id}`)
  };

  const handleRemove = async (manutencao: Manutencao) => {
    if (window.confirm("Deseja mesmo remover este registro de manutenção?")) {
      try {
        await ManutencaoApi.remove(Number(veiculoId), manutencao.id);
        fetchManutencoes();
      } catch (error) {
        console.error(error);
      }
      }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Início da manutenção</th>
            <th>Fim da manutenção</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {manutencoes.map((manutencao) => (
            <tr key={manutencao.id}>
              <td>{new Date(manutencao.dataInicio).toISOString().slice(0, 10)}</td>
              <td>{new Date(manutencao.dataFim).toISOString().slice(0, 10)}</td>
              <td>
                <button onClick={() => handleEdit(manutencao)}>Editar</button>
                <button onClick={() => handleRemove(manutencao)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaManutencao;