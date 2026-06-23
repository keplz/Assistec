import { useState, useEffect } from "react";
import { criarCliente, listarClientes } from "../services/clienteService";

export default function Cliente() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [clientes, setClientes] = useState([]);

  async function carregarClientes() {
    const data = await listarClientes();
    setClientes(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nome || !telefone) {
      alert("Preencha todos os campos");
      return;
    }

    await criarCliente(nome, telefone);

    setNome("");
    setTelefone("");

    await carregarClientes();
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div>
      <h2>Clientes</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <button type="submit">Salvar</button>
      </form>

      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nome} - {cliente.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
}