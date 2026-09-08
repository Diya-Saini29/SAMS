import {
  Bell,
  ChevronDown,
  Menu,
  Plane,
  LayoutDashboard,
  Briefcase,
  Users,
  UserRound,
  Bus,
  BarChart3,
  Settings,
  Search,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const navigationItems = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/flights", "Flights", Plane],
  ["/luggage", "Luggage", Briefcase],
  ["/visitors", "Visitors", Users],
  ["/staff", "Staff", UserRound],
  ["/transportation", "Transportation", Bus],
  ["/reports", "Reports", BarChart3],
  ["/settings", "Settings", Settings],
];

export default function Topbar({ onMenu }) {
  const { user, logout } = useAuth();

  const name = "John";

  const role = user?.role
    ? user.role.replace(/_/g, " ")
    : "Administrator";

  // Current date/time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date using India timezone
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(currentTime);

  // Format time using India timezone
  const formattedTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(currentTime);

  return (
    <>
      {/* MAIN TOPBAR */}
      <header className="topbar">

        {/* LOGO */}
        <div className="brand">
          <div className="brand-mark">
            <Plane size={27} />
          </div>

          <div className="brand-copy">
            <strong>SAMS</strong>
            <small>Smart Airport Management System</small>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="desktop-nav">
          {navigationItems.map(([path, label, Icon]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `top-nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={23} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* MOBILE */}
        <button
          className="mobile-menu"
          type="button"
          onClick={onMenu}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* SECOND ROW */}
      <div className="topbar-sub">

        {/* SEARCH */}
        <div className="global-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search flights, passengers, staff..."
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="top-user">

          {/* CURRENT DATE & TIME */}
          <div className="date-block">
            <span>{formattedDate}</span>

            <i />

            <span>{formattedTime}</span>

            <span>(GMT+5:30)</span>
          </div>

          {/* NOTIFICATIONS */}
          <button
            className="bell"
            type="button"
            aria-label="Notifications"
          >
            <Bell size={22} />
            <b />
          </button>

          {/* USER */}
          <button
            className="user-menu"
            type="button"
            onClick={logout}
            title="Sign out"
          >
            <span className="avatar">
              {name.charAt(0).toUpperCase()}
            </span>

            <span className="user-copy">
              <strong>{name}</strong>
              <small>{role}</small>
            </span>

            <ChevronDown size={17} />
          </button>

        </div>
      </div>
    </>
  );
}