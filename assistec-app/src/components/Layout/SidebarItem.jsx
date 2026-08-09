import { NavLink } from "react-router-dom";

export default function SidebarItem({
  to,
  icon: Icon,
  label,
  expandida
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "menu-item active" : "menu-item"
      }
    >
      <Icon size={22} />

      {expandida && (
        <span>{label}</span>
      )}
    </NavLink>
  );
}