import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Motorista } from '../types/motorista';
import { MotoristaApi } from '../api/motorista.api';
import { FormularioMotoristas } from '../components/formularioMotoristas';


const EdicaoMotorista = () => {
  const { motoristaId } = useParams();
  const navigate = useNavigate();

  const [motorista, setMotorista] = useState<Motorista>();

  useEffect(() => {
    const fetchMotorista = async () => {
      try {
        const fetched = await MotoristaApi.get(Number(motoristaId));
        setMotorista(fetched);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMotorista();
  }, [motoristaId]);

  const onSubmit = (data: Motorista) => {
    MotoristaApi.update({
      ...data,
      id: Number(motoristaId)
    })
      .then(() => navigate('/motoristas'))
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>Editar Motorista</h1>
      {motorista && <FormularioMotoristas motorista={motorista} onSubmit={onSubmit} />}
    </div>
  );
};

export default EdicaoMotorista;
