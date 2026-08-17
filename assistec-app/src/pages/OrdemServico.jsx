import { useEffect, useState } from "react";
import { criarOS, listarOS } from "../services/osService";
import { ouvirClientes } from "../services/clienteService";

import OSDetailsModal from "../modals/OSDetailsModal";
import OSEditModal from "../modals/OSEditModal";

import "../styles/ordemServico.css";
import OSCreateModal from "../modals/OSCreateModal";

export default function OrdemServico() {
  const [clientes, setClientes] = useState([]);
  const [ordens, setOrdens] = useState([]);

  const [criandoOS, setCriandoOS] = useState(false);

  const [osSelecionada, setOsSelecionada] = useState(null);
  const [osEditando, setOsEditando] = useState(null);

  async function carregarOS() {
    const data = await listarOS();
    setOrdens(data);
  }


  useEffect(() => {
    const unsubscribeClientes = ouvirClientes(setClientes);

    carregarOS();

    return () => unsubscribeClientes();
  }, []);

    return (
      <div className="os-page">

        {/* CABEÇALHO */}
        <div className="os-page-header">
          <div>
            <h2>Ordens de Serviço</h2>

            <p>
              Gerencie os serviços e acompanhe o andamento das ordens.
            </p>
          </div>

          <button
            className="os-new-button"
            onClick={() => setCriandoOS(true)}            
          >
            + Nova OS
          </button>
        </div>


        {/* RESUMO */}
        <div className="os-summary">

          <div className="os-summary-card">
            <span className="os-summary-label">
              Total de OS
            </span>

            <strong>
              {ordens.length}
            </strong>
          </div>


          <div className="os-summary-card">
            <span className="os-summary-label">
              Em andamento
            </span>

            <strong>
              {
                ordens.filter(
                  (os) =>
                    os.status !== "finalizado" &&
                    os.status !== "pronto"
                ).length
              }
            </strong>
          </div>


          <div className="os-summary-card">
            <span className="os-summary-label">
              Prontas
            </span>

            <strong>
              {
                ordens.filter(
                  (os) => os.status === "pronto"
                ).length
              }
            </strong>
          </div>

        </div>


        {/* LISTAGEM TEMPORÁRIA */}

        <div className="os-list-section">

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
                    clienteNome: cliente
                      ? cliente.nome
                      : "Cliente não encontrado",
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                OS #{os.numero} —{" "}
                {os.aparelho?.marca}{" "}
                {os.aparelho?.modelo}{" "}
                - {os.status}
              </li>
            ))}
          </ul>

        </div>


        {/*MODAL DE CRIAÇÃO*/}

        {criandoOS && (
          <OSCreateModal
            clientes={clientes}
            onClose={() => setCriandoOS(false)}
            onCreated={carregarOS}
          />
        )}


        {/* MODAL DE DETALHES */}

        {osSelecionada && (
          <OSDetailsModal
            os={osSelecionada}
            onClose={() => setOsSelecionada(null)}
            onEdit={() => {
              setOsEditando(osSelecionada);
              setOsSelecionada(null);
            }}
          />
        )}


        {/* MODAL DE EDIÇÃO */}

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