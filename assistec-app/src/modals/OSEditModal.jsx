import { useEffect, useState } from "react";
import { atualizarOS } from "../services/osService";

import "../styles/modals/osDetailsModal.css"

export default function OSEditModal({
  os,
  clientes,
  onClose,
  onUpdated,
}) {
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

  useEffect(() => {
    if (!os) return;

    setClienteId(os.clienteId || "");
    setMarca(os.aparelho?.marca || "");
    setModelo(os.aparelho?.modelo || "");
    setImei(os.aparelho?.imei || "");
    setDefeito(os.defeito || "");
    setStatus(os.status || "aberto");
    setValorServico(os.valorServico || "");
    setFormaPagamento(os.formaPagamento || "");
    setStatusPagamento(os.statusPagamento || "pendente");
    setDataPrevisaoEntrega(os.dataPrevisaoEntrega || "");
    setObservacoes(os.observacoes || "");
  }, [os]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!clienteId || !marca || !modelo) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    try {
      await atualizarOS(os.id, {
        clienteId,
        marca,
        modelo,
        imei,
        defeito,
        status,
        valorServico,
        formaPagamento,
        statusPagamento,
        dataPrevisaoEntrega,
        observacoes,
      });

      alert("OS atualizada com sucesso!");

      if (onUpdated) {
        await onUpdated();
      }

      onClose();
    } catch (error) {
      console.error("Erro ao atualizar OS:", error);
      alert("Erro ao atualizar a ordem de serviço.");
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="os-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="os-modal-header">
          <div>
            <span className="os-modal-label">
              Editar Ordem de Serviço
            </span>

            <h2>OS #{os.numero}</h2>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form
          className="os-modal-content"
          onSubmit={handleSubmit}
        >
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

          <input
            placeholder="Defeito"
            value={defeito}
            onChange={(e) => setDefeito(e.target.value)}
          />

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

          <input
            type="number"
            placeholder="Valor do serviço"
            value={valorServico}
            onChange={(e) => setValorServico(e.target.value)}
          />

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
            onChange={(e) =>
              setStatusPagamento(e.target.value)
            }
          >
            <option value="pendente">
              Pagamento pendente
            </option>
            <option value="pago">Pago</option>
          </select>

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

          <textarea
            placeholder="Observações"
            value={observacoes}
            onChange={(e) =>
              setObservacoes(e.target.value)
            }
          />

          <div className="os-modal-footer">
            <button
              type="button"
              className="modal-button secondary"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="modal-button primary"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}