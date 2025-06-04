import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiBell } from "react-icons/bi";
import { HeaderProps } from "../interface";

export default function HeaderComponents({
  user,
  notificationsCount,
  onLogout,
}: HeaderProps) {
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setShowCard(true);
  const handleMouseLeave = () => setShowCard(false);

  return (
    <header className="bg-light shadow-sm p-3 d-flex justify-content-between align-items-center position-relative">
      <h4 className="m-0">Dashboard</h4>

      <div className="d-flex align-items-center gap-2">
        <div
          className="position-relative"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/notification")}
        >
          <BiBell size={24} color="#000" />{" "}
          {notificationsCount > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
              style={{ width: "10px", height: "10px" }}
            />
          )}
        </div>

        <div
          className="d-flex align-items-center gap-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: "pointer" }}
        >
          <img
            src={user?.avatar ? `data:image/jpeg;base64,${user.avatar}` : "F"}
            alt=""
            className="rounded-circle"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />

          <span className="d-flex align-items-center">Olá, {user?.nome}</span>

          {showCard && (
            <div
              className="dropdown-menu show"
              style={{
                position: "absolute",
                top: "50px",
                right: "0",
                zIndex: 9999,
                width: "150px",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/profile"
                className="text-dark nav-link d-flex align-items-center gap-2"
              >
                <button className="dropdown-item">Perfil</button>
              </Link>
              <Link
                to="/config"
                className="text-dark nav-link d-flex align-items-center gap-2"
              >
                <button className="dropdown-item">Configurações</button>
              </Link>
              <button className="dropdown-item" onClick={onLogout}>
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
