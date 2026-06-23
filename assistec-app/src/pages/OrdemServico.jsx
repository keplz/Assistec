import { useEffect, useState } from "react";
import { criarOS, listarOS } from "../services/osService";
import { listarClientes } from "../services/clienteService";
import { ouvirClientes } from "../services/clienteService";

export default function OrdemServico() {
  const [clientes, setClientes] = useState([]);
  const [ordens, setOrdens] = useState([]);

  const [clienteId, setClienteId] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [defeito, setDefeito] = useState("");
  const [status, setStatus] = useState("aberto");

  const [valor, setValor] = useState("");
  const [pagamento, setPagamento] = useState("pendente");
  const [dataEntrada, setDataEntrada] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");

  async function carregarClientes() {
    const data = await listarClientes();
    setClientes(data);
  }

  async function carregarOS() {
    const data = await listarOS();
    setOrdens(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log({
        clienteId,
        marca,
        modelo
    });

    if (!clienteId || !marca || !modelo) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    await criarOS({
        clienteId,
        marca,
        modelo,
        defeito,
        status,
        valor,
        pagamento,
        dataEntrada,
        dataEntrega
    });

    setClienteId("");
    setMarca("");
    setModelo("");
    setDefeito("");
    setStatus("aberto");

    await carregarOS();
  }

    useEffect(() => {
    const unsubscribeClientes = ouvirClientes(setClientes);

    carregarOS();

    return () => unsubscribeClientes();
    }, []);

  return (
    <div>
      <h2>Ordem de Serviço</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
        >
          <option value="">Selecione o cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        <input
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />

        <input
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />

        <input
          placeholder="Defeito"
          value={defeito}
          onChange={(e) => setDefeito(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="aberto">Aberto</option>
          <option value="em_analise">Em análise</option>
          <option value="aguardando_peca">Aguardando peça</option>
          <option value="pronto">Pronto</option>
          <option value="finalizado">Finalizado</option>
        </select>
        
        <input
            placeholder="Valor do serviço"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
        />

        <input
            type="date"
            value={dataEntrada}
            onChange={(e) => setDataEntrada(e.target.value)}
        />

        <input
            type="date"
            value={dataEntrega}
            onChange={(e) => setDataEntrega(e.target.value)}
        />

        <select value={pagamento} onChange={(e) => setPagamento(e.target.value)}>
            <option value="pendente">Pendente</option>
            <option value="pago">Pago</option>
        </select>
        <button type="submit">Criar OS</button>
      </form>

      <h3>Ordens cadastradas</h3>

      <ul>
        {ordens.map((os) => (
          <li key={os.id}>
            {os.marca} {os.modelo} - {os.status}
          </li>
        ))}
      </ul>
    </div>
  );
}