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

        <Routes>
          <Route path="/veiculos" element={<ListaVeiculos />} />
          <Route path="/veiculos/:veiculoId" element={<EdicaoVeiculo />} />
          <Route path="/veiculos/novo" element={<CriacaoVeiculo />} />
        </Routes>
      </div>
    </Router>
  );
}
