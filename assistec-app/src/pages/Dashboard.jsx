import {
  DollarSign,
  TrendingUp,
  Wrench,
  Smartphone,
  Clock,
  CheckCircle,
  AlertCircle,
  Package
} from "lucide-react";

import "../styles/dashboard.css";

export default function Dashboard() {
  const resumo = [
    {
      titulo: "Faturamento",
      valor: "R$ 8.450,00",
      descricao: "Este mês",
      icone: DollarSign,
      tipo: "blue",
    },
    {
      titulo: "Lucro",
      valor: "R$ 4.230,00",
      descricao: "Este mês",
      icone: TrendingUp,
      tipo: "green",
    },
    {
      titulo: "Serviços em andamento",
      valor: "12",
      descricao: "Ordens abertas",
      icone: Wrench,
      tipo: "orange",
    },
    {
      titulo: "Aparelhos para venda",
      valor: "5",
      descricao: "Em estoque",
      icone: Smartphone,
      tipo: "purple",
    },
  ];

  const ordens = [
    {
      id: "1024",
      cliente: "João Silva",
      aparelho: "iPhone 13",
      status: "Em análise",
    },
    {
      id: "1023",
      cliente: "Maria Santos",
      aparelho: "Galaxy A54",
      status: "Aguardando peça",
    },
    {
      id: "1022",
      cliente: "Pedro Souza",
      aparelho: "Moto G22",
      status: "Pronto",
    },
  ];

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Visão geral da sua assistência técnica</p>
        </div>
      </div>

      {/* CARDS DE RESUMO */}

      <div className="dashboard-summary">
        {resumo.map((item) => {
          const Icon = item.icone;

          return (
            <div className="summary-card" key={item.titulo}>

              <div className={`summary-icon ${item.tipo}`}>
                <Icon size={22} />
              </div>

              <div className="summary-content">
                <span>{item.titulo}</span>
                <strong>{item.valor}</strong>
                <small>{item.descricao}</small>
              </div>

            </div>
          );
        })}
      </div>

      {/* ÁREA PRINCIPAL */}

      <div className="dashboard-grid">

        {/* SERVIÇOS EM ANDAMENTO */}

        <section className="dashboard-card">

          <div className="card-header">
            <div>
              <h2>Serviços em andamento</h2>
              <p>Ordens que precisam de atenção</p>
            </div>

            <Wrench size={20} />
          </div>

          <div className="service-list">

            {ordens.map((os) => (
              <div className="service-item" key={os.id}>

                <div className="service-info">
                  <strong>OS #{os.id}</strong>
                  <span>{os.aparelho}</span>
                  <small>{os.cliente}</small>
                </div>

                <span
                  className={`status status-${os.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {os.status}
                </span>

              </div>
            ))}

          </div>

        </section>

        {/* STATUS DAS OS */}

        <section className="dashboard-card">

          <div className="card-header">
            <div>
              <h2>Status das OS</h2>
              <p>Distribuição das ordens</p>
            </div>

            <Clock size={20} />
          </div>

          <div className="status-list">

            <div className="status-row">
              <div>
                <span className="status-dot blue"></span>
                <span>Aberto</span>
              </div>

              <strong>5</strong>
            </div>

            <div className="status-row">
              <div>
                <span className="status-dot orange"></span>
                <span>Em análise</span>
              </div>

              <strong>3</strong>
            </div>

            <div className="status-row">
              <div>
                <span className="status-dot yellow"></span>
                <span>Aguardando peça</span>
              </div>

              <strong>2</strong>
            </div>

            <div className="status-row">
              <div>
                <span className="status-dot green"></span>
                <span>Pronto</span>
              </div>

              <strong>2</strong>
            </div>

          </div>

        </section>

      </div>

      {/* ÚLTIMAS OS */}

      <section className="dashboard-card recent-orders">

        <div className="card-header">
          <div>
            <h2>Últimas ordens de serviço</h2>
            <p>Ordens cadastradas recentemente</p>
          </div>

          <Package size={20} />
        </div>

        <div className="orders-table">

          <div className="table-header">
            <span>OS</span>
            <span>Cliente</span>
            <span>Aparelho</span>
            <span>Status</span>
          </div>

          {ordens.map((os) => (
            <div className="table-row" key={os.id}>
              <strong>#{os.id}</strong>
              <span>{os.cliente}</span>
              <span>{os.aparelho}</span>

              <span className="table-status">
                {os.status}
              </span>
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}