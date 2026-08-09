import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  House,
  ClipboardList,
  Users,
  Package,
  ShoppingBag,
  Wallet,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import logoCompleta from "../../assets/logo-completa.png";
import logoIcon from "../../assets/icon.png";

import SidebarItem from "./SidebarItem";

import "../../styles/sidebar.css";

export default function Sidebar() {
  const [expandida, setExpandida] = useState(true);

  const menuItems = [
    {
      to: "/",
      label: "Início",
      icon: House
    },
    {
      to: "/os",
      label: "Ordem de Serviço",
      icon: ClipboardList
    },
    {
      to: "/clientes",
      label: "Clientes",
      icon: Users
    },
    {
      to: "/estoque",
      label: "Estoque",
      icon: Package
    },
    {
      to: "/revenda",
      label: "Revenda",
      icon: ShoppingBag
    },
    {
      to: "/financeiro",
      label: "Financeiro",
      icon: Wallet
    },
    {
      to: "/relatorios",
      label: "Relatórios",
      icon: BarChart3
    },
    {
      to: "/configuracoes",
      label: "Configurações",
      icon: Settings
    }
  ];

  return (
    <aside className={expandida ? "sidebar" : "sidebar collapsed"}>
      <div className="sidebar-header">
        <img
          src={expandida ? logoCompleta : logoIcon}
          alt="AuroraTec"
          className="logo"
        />

      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            expandida={expandida}
          />
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className="collapse-button"
          onClick={() => setExpandida(!expandida)}
          aria-label={expandida ? "Fechar menu" : "Abrir menu"}
        >
          {expandida ? (
              <PanelLeftClose size={20} />
            ) :( 
              <PanelLeftOpen size={20} />
            )}
        </button>
      </div>  

    </aside>
  );
}