import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { Dashboard } from './dashboard/components/dashboard';
import { ListaVeiculos } from "./veiculos/screens/listaVeiculos";
import EdicaoVeiculo from "./veiculos/screens/edicaoVeiculo";
import CriacaoVeiculo from "./veiculos/screens/criacaoVeiculo";
import { ListaManutencoes } from "./manutencoes/screens/listaManutencoes";
import CriacaoManutencao from "./manutencoes/screens/criacaoManutencao";
import EdicaoManutencao from "./manutencoes/screens/edicaoManutencao";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ListaMotoristas } from "./motoristas/screens/listaMotoristas";
import CriacaoMotorista from "./motoristas/screens/criacaoMotorista";
import EdicaoMotorista from "./motoristas/screens/edicaoMotorista";

export default function App() {
  useEffect(() => {
    const navToggle = document.getElementById('nav-toggle') as HTMLInputElement | null;
    const body = document.body;

    const handleToggle = () => {
      if (navToggle) {
        body.classList.toggle('menu-open', navToggle.checked);
        body.classList.toggle('menu-closed', !navToggle.checked);
      }
    };

    if (navToggle) {
      navToggle.addEventListener('change', handleToggle);

      // Initial setting based on the checkbox state
      handleToggle();

      return () => {
        navToggle.removeEventListener('change', handleToggle);
      };
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <div id="nav-bar">
          <input id="nav-toggle" type="checkbox" />
          <div id="nav-header">
            <Link to="/" id="nav-title">Home</Link>
            <label htmlFor="nav-toggle"><span id="nav-toggle-burger"></span></label>
            <hr />
          </div>
          <div id="nav-content">
            <div className="nav-button"><i className="fas fa-car"></i><span><Link to="/veiculos">Veículos</Link></span></div>
            <div className="nav-button"><i className="fas fa-user"></i><span><Link to="/motoristas">Motoristas</Link></span></div>
          </div>
        </div>
        <div className="app-content">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Routes>
            
              <Route path="/" element={<Dashboard />} />
              <Route path="/veiculos" element={<ListaVeiculos />} />
              <Route path="/motoristas" element={<ListaMotoristas />} />
              <Route path="/motoristas/novo" element={<CriacaoMotorista />} />
              <Route path="/motoristas/:motoristaId" element={<EdicaoMotorista />} />
              <Route path="/veiculos/:veiculoId" element={<EdicaoVeiculo />} />
              <Route path="/veiculos/novo" element={<CriacaoVeiculo />} />
              <Route path="/veiculos/:veiculoId/manutencao" element={<ListaManutencoes />} />
              <Route path="/veiculos/:veiculoId/manutencao/nova" element={<CriacaoManutencao />} />
              <Route path="/veiculos/:veiculoId/manutencao/:manutencaoId" element={<EdicaoManutencao />} />
            </Routes>
          </LocalizationProvider>
        </div>
      </div>
    </Router>
  );
}
