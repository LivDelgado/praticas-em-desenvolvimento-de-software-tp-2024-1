import React, { useState, useEffect } from 'react';
import { VeiculoApi } from '../api/veiculo.api';
import { Veiculo } from '../types/veiculo';

function TabelaVeiculos() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [editing, setEditing] = useState<Veiculo | null>(null);

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const veiculos = await VeiculoApi.getAll();
      console.log(veiculos);
      setVeiculos(veiculos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (veiculo: Veiculo) => {
    setEditing(veiculo);
  };

  const handleRemove = async (veiculo: Veiculo) => {
    try {
      await VeiculoApi.remove(veiculo.id);
      fetchVeiculos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (veiculoAtualizado: Veiculo) => {
    try {
      await VeiculoApi.update(veiculoAtualizado);
      fetchVeiculos();
      setEditing(null);
    } catch (error) {
      console.error(error);
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
                {editing ? (
                  <button onClick={() => handleUpdate(veiculo)}>Salvar</button>
                ) : (
                  <button onClick={() => handleEdit(veiculo)}>Editar</button>
                )}
                <button onClick={() => handleRemove(veiculo)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <div>
          <label>
            Data de aquisição:
            <input type="date" value={new Date(editing.dataAquisicao).toLocaleDateString()} onChange={(e) => setEditing({...editing, dataAquisicao: new Date(e.target.value) })} />
          </label>
        </div>
      )}
    </div>
  );
}

export default TabelaVeiculos;