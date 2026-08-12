import "../styles/modals/osDetailsModal.css"


export default function OSDetailsModal({ 
  os,
  onClose,
 }) {
  if (!os) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="os-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="os-modal-header">
          <div>
            <span className="os-modal-label">
              Ordem de Serviço
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

        <div className="os-modal-content">

          <div className="os-detail-section">
            <h3>Cliente</h3>

            <p>
              {os.clienteNome || "Cliente não encontrado"}
            </p>
          </div>

          <div className="os-detail-section">
            <h3>Aparelho</h3>

            <p>
              {os.aparelho?.marca}{" "}
              {os.aparelho?.modelo}
            </p>

            {os.aparelho?.imei && (
              <span>
                IMEI: {os.aparelho.imei}
              </span>
            )}
          </div>

          <div className="os-detail-section">
            <h3>Defeito relatado</h3>

            <p>
              {os.defeito || "Nenhum defeito informado"}
            </p>
          </div>

          <div className="os-detail-grid">

            <div className="os-detail-section">
              <h3>Status</h3>

              <span className="os-status">
                {formatarStatus(os.status)}
              </span>
            </div>

            <div className="os-detail-section">
              <h3>Valor</h3>

              <p>
                {formatarValor(os.valorServico)}
              </p>
            </div>

          </div>

          <div className="os-detail-grid">

            <div className="os-detail-section">
              <h3>Pagamento</h3>

              <p>
                {formatarPagamento(os.formaPagamento)}
              </p>

              <span>
                {os.statusPagamento === "pago"
                  ? "Pago"
                  : "Pendente"}
              </span>
            </div>

            <div className="os-detail-section">
              <h3>Previsão de entrega</h3>

              <p>
                {formatarData(os.dataPrevisaoEntrega)}
              </p>
            </div>

          </div>

          <div className="os-detail-section">
            <h3>Observações</h3>

            <p>
              {os.observacoes || "Nenhuma observação."}
            </p>
          </div>

        </div>

        <div className="os-modal-footer">
          <button
            className="modal-button secondary"
            onClick={onClose}
          >
            Fechar
          </button>

          <button
            className="modal-button primary"
            onClick = {onEdit}
          >
            Editar OS
          </button>
        </div>

      </div>
    </div>
  );
}

function formatarStatus(status) {
  const statusMap = {
    aberto: "Aberto",
    em_analise: "Em análise",
    aguardando_peca: "Aguardando peça",
    pronto: "Pronto",
    finalizado: "Finalizado",
    em_divida: "Em dívida",
  };

  return statusMap[status] || status;
}

function formatarPagamento(pagamento) {
  const pagamentos = {
    dinheiro: "Dinheiro",
    pix: "PIX",
    cartao: "Cartão",
  };

  return pagamentos[pagamento] || "Não informado";
}

function formatarValor(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarData(data) {
  if (!data) return "Não definida";

  if (typeof data === "string") {
    const partes = data.split("-");

    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
  }

  return "Não definida";
}