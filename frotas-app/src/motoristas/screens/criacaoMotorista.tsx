import { useNavigate } from "react-router-dom";
import { MotoristaApi } from "../api/motorista.api";
import { FormularioMotoristas } from "../components/formularioMotoristas";
import { Motorista } from "../types/motorista";
import { useState } from "react";

const CriacaoMotorista = () => {
    const navigate = useNavigate();
  
    const [motorista] = useState<Motorista>();
  
    const onSubmit = (data: Motorista) => {
      MotoristaApi.add(data)
      .then(() => navigate('/motoristas'))
      .catch((error) => console.error(error));
    }
  
    return (
      <div>
        <h1>Adicionar Motorista</h1>
        <FormularioMotoristas motorista={motorista} onSubmit={onSubmit} />
      </div>
    );
  };
  
  export default CriacaoMotorista;