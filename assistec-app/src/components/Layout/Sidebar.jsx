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
  Menu
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

      <button
        className="toggle-button"
        onClick={() => setExpandida(!expandida)}
      >
        <Menu size={20} />
      </button>

    </aside>
  );
}