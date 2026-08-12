import { useEffect, useState } from "react";
import { criarOS, listarOS } from "../services/osService";
import { ouvirClientes } from "../services/clienteService";

import OSDetailsModal from "../modals/OSDetailsModal";
import OSEditModal from "../modals/OSEditModal";

export default function OrdemServico() {
  const [clientes, setClientes] = useState([]);
  const [ordens, setOrdens] = useState([]);

  const [osSelecionada, setOsSelecionada] = useState(null);
  const [ osEditando, setOsEditando ] = useState(null);

  const [clienteId, setClienteId] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [imei, setImei] = useState("");
  const [defeito, setDefeito] = useState("");

  const [status, setStatus] = useState("aberto");

  const [valorServico, setValorServico] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [statusPagamento, setStatusPagamento] = useState("pendente");

  const [dataPrevisaoEntrega, setDataPrevisaoEntrega] = useState("");
  const [observacoes, setObservacoes] = useState("");

  async function carregarOS() {
    const data = await listarOS();
    setOrdens(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!clienteId || !marca || !modelo) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    try {
      await criarOS({
        clienteId,

        marca,
        modelo,
        imei,

        defeito,

        status,

        valorServico: Number(valorServico) || 0,

        formaPagamento,

        statusPagamento,

        dataPrevisaoEntrega,

        observacoes,
      });

      alert("Ordem de serviço criada com sucesso!");

      // Limpar formulário
      setClienteId("");
      setMarca("");
      setModelo("");
      setImei("");
      setDefeito("");

      setStatus("aberto");

      setValorServico("");
      setFormaPagamento("");
      setStatusPagamento("pendente");

      setDataPrevisaoEntrega("");
      setObservacoes("");

      await carregarOS();

    } catch (error) {
      console.error("Erro ao criar OS:", error);
      alert("Erro ao criar a ordem de serviço.");
    }
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

        {/* CLIENTE */}

        <select
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
        >
          <option value="">Selecione o cliente *</option>

          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>

        {/* APARELHO */}

        <input
          placeholder="Marca *"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />

        <input
          placeholder="Modelo *"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />

        <input
          placeholder="IMEI"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
        />

        {/* DEFEITO */}

        <input
          placeholder="Defeito relatado"
          value={defeito}
          onChange={(e) => setDefeito(e.target.value)}
        />

        {/* STATUS */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="aberto">Aberto</option>
          <option value="em_analise">Em análise</option>
          <option value="aguardando_peca">
            Aguardando peça
          </option>
          <option value="pronto">Pronto</option>
          <option value="finalizado">Finalizado</option>
          <option value="em_divida">Em dívida</option>
        </select>

        {/* VALOR */}

        <input
          type="number"
          placeholder="Valor do serviço"
          value={valorServico}
          onChange={(e) => setValorServico(e.target.value)}
        />

        {/* PAGAMENTO */}

        <select
          value={formaPagamento}
          onChange={(e) => setFormaPagamento(e.target.value)}
        >
          <option value="">Forma de pagamento</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="pix">PIX</option>
          <option value="cartao">Cartão</option>
        </select>

        <select
          value={statusPagamento}
          onChange={(e) => setStatusPagamento(e.target.value)}
        >
          <option value="pendente">Pagamento pendente</option>
          <option value="pago">Pago</option>
        </select>

        {/* DATA */}

        <label>
          Previsão de entrega
        </label>

        <input
          type="date"
          value={dataPrevisaoEntrega}
          onChange={(e) =>
            setDataPrevisaoEntrega(e.target.value)
          }
        />

        {/* OBSERVAÇÕES */}

        <textarea
          placeholder="Observações"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        />

        <button type="submit">
          Criar OS
        </button>

      </form>

      {/* LISTAGEM */}

      <h3>Ordens cadastradas</h3>

      <ul>
        {ordens.map((os) => (
          <li 
            key={os.id}
            onClick={() => {
                const cliente = clientes.find(
                  (c) => c.id === os.clienteId
                );

                setOsSelecionada({
                  ...os,
                  clienteNome: cliente ? cliente.nome : "Cliente não encontrado",
                });
              }
            }
            style={{ cursor: "pointer" }}
          >

            OS #{os.numero} —{" "}

            {os.aparelho?.marca}{" "}
            {os.aparelho?.modelo}{" "}

            - {os.status}

          </li>
        ))}
      </ul>
        {osSelecionada && (
          <OSDetailsModal
            os={osSelecionada}
            onClose={() => setOsSelecionada(null)}
            onEdit={() => {
              setOsEditando(osSelecionada);
              setOsSelecionada(null)
            }}
          />
        )}

        {osEditando && (
          <OSEditModal
            os={osEditando}
            clientes={clientes}
            onClose={() => setOsEditando(null)}
            onUpdated={carregarOS}
          />
        )}
    </div>
  );
}