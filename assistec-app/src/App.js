import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import OrdemServico from "./pages/OrdemServico";
import Estoque from "./pages/Estoque";
import Revenda from "./pages/Revenda";
import Financeiro from "./pages/Financeiro";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/os" element={<OrdemServico />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/revenda" element={<Revenda />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route
            path="/configuracoes"
            element={<Configuracoes />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;