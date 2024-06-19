import React, { useState, useEffect } from 'react';
import { VeiculoApi } from '../api/veiculo.api';
import { Veiculo } from '../types/veiculo';
import { useNavigate } from 'react-router-dom';

function TabelaVeiculos() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const veiculos = await VeiculoApi.getAll();
      setVeiculos(veiculos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (veiculo: Veiculo) => {
    navigate(`/veiculos/${veiculo.id}`)
  };

  const handleRemove = async (veiculo: Veiculo) => {
    if (window.confirm("Deseja mesmo remover este veículo?")) {
      try {
        await VeiculoApi.remove(veiculo.id);
        fetchVeiculos();
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
            <th>Nome</th>
            <th>Data de aquisição</th>
            <th>Motorista</th>
            <th>Próxima manutenção</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo.id}>
              <td>{veiculo.montadora + veiculo.modelo}</td>
              <td>{new Date(veiculo.dataAquisicao).toLocaleDateString()}</td>
              {/* <td>{veiculo.driver}</td> */}
              {/* <td>{veiculo.nextMaintenance}</td> */}
              <td>
                <button onClick={() => handleEdit(veiculo)}>Editar</button>
                <button onClick={() => handleRemove(veiculo)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaVeiculos;