import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { ListaVeiculos } from "./veiculos/screens/listaVeiculos";
import EdicaoVeiculo from "./veiculos/screens/edicaoVeiculo";
import CriacaoVeiculo from "./veiculos/screens/criacaoVeiculo";
import { ListaManutencoes } from "./manutencoes/screens/listaManutencoes";
import CriacaoManutencao from "./manutencoes/screens/criacaoManutencao";
import EdicaoManutencao from "./manutencoes/screens/edicaoManutencao";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/veiculos">Veículos</Link>
            </li>
          </ul>
        </nav>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route path="/veiculos" element={<ListaVeiculos />} />
            <Route path="/veiculos/:veiculoId" element={<EdicaoVeiculo />} />
            <Route path="/veiculos/novo" element={<CriacaoVeiculo />} />
            <Route path="/veiculos/:veiculoId/manutencao" element={<ListaManutencoes />} />
            <Route path="/veiculos/:veiculoId/manutencao/nova" element={<CriacaoManutencao />} />
            <Route path="/veiculos/:veiculoId/manutencao/:manutencaoId" element={<EdicaoManutencao />} />
          </Routes>
        </LocalizationProvider>


      </div>
    </Router>
  );
}
