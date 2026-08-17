import { useState } from "react";
import { criarOS } from "../services/osService";

export default function OSCreateModal({
  clientes,
  onClose,
  onCreated,
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

      if (onCreated) {
        await onCreated();
      }

      onClose();

    } catch (error) {
      console.error("Erro ao criar OS:", error);
      alert("Erro ao criar a ordem de serviço.");
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="os-modal os-create-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="os-modal-header">
          <div>
            <span className="os-modal-label">
              Nova Ordem de Serviço
            </span>

            <h2>Criar OS</h2>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <form
          className="os-modal-content"
          onSubmit={handleSubmit}
        >

          {/* CLIENTE */}

          <div className="os-form-group">
            <label>Cliente *</label>

            <select
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
            >
              <option value="">
                Selecione o cliente
              </option>

              {clientes.map((cliente) => (
                <option
                  key={cliente.id}
                  value={cliente.id}
                >
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>


          {/* APARELHO */}

          <div className="os-form-row">

            <div className="os-form-group">
              <label>Marca *</label>

              <input
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Ex.: Samsung"
              />
            </div>

            <div className="os-form-group">
              <label>Modelo *</label>

              <input
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Ex.: Galaxy A54"
              />
            </div>

          </div>


          <div className="os-form-group">
            <label>IMEI</label>

            <input
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              placeholder="Digite o IMEI"
            />
          </div>


          {/* DEFEITO */}

          <div className="os-form-group">
            <label>Defeito relatado</label>

            <textarea
              value={defeito}
              onChange={(e) => setDefeito(e.target.value)}
              placeholder="Descreva o problema informado pelo cliente"
              rows="3"
            />
          </div>


          {/* STATUS */}

          <div className="os-form-group">
            <label>Status</label>

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
              <option value="finalizado">
                Finalizado
              </option>
              <option value="em_divida">
                Em dívida
              </option>
            </select>
          </div>


          {/* FINANCEIRO */}

          <div className="os-form-row">

            <div className="os-form-group">
              <label>Valor do serviço</label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={valorServico}
                onChange={(e) =>
                  setValorServico(e.target.value)
                }
                placeholder="R$ 0,00"
              />
            </div>

            <div className="os-form-group">
              <label>Forma de pagamento</label>

              <select
                value={formaPagamento}
                onChange={(e) =>
                  setFormaPagamento(e.target.value)
                }
              >
                <option value="">
                  Selecione
                </option>

                <option value="dinheiro">
                  Dinheiro
                </option>

                <option value="pix">
                  PIX
                </option>

                <option value="cartao">
                  Cartão
                </option>
              </select>
            </div>

          </div>


          <div className="os-form-group">
            <label>Status do pagamento</label>

            <select
              value={statusPagamento}
              onChange={(e) =>
                setStatusPagamento(e.target.value)
              }
            >
              <option value="pendente">
                Pendente
              </option>

              <option value="pago">
                Pago
              </option>
            </select>
          </div>


          {/* ENTREGA */}

          <div className="os-form-group">
            <label>Previsão de entrega</label>

            <input
              type="date"
              value={dataPrevisaoEntrega}
              onChange={(e) =>
                setDataPrevisaoEntrega(e.target.value)
              }
            />
          </div>


          {/* OBSERVAÇÕES */}

          <div className="os-form-group">
            <label>Observações</label>

            <textarea
              value={observacoes}
              onChange={(e) =>
                setObservacoes(e.target.value)
              }
              placeholder="Observações adicionais"
              rows="3"
            />
          </div>


          {/* RODAPÉ */}

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
              Criar OS
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}