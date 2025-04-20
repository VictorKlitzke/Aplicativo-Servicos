import { Home, FileText, User, Bell, Settings, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SidebarComponents() {
    const [showSubmenu, setShowSubmenu] = useState(false);
    return (
        <aside className="bg-dark text-white p-3 d-flex flex-column" style={{ height: '100vh', width: '250px' }}>
            <h2 className="mb-4">Serviços</h2>

            <nav className="nav flex-column gap-2 flex-grow-1">
                <Link to="/dashboard" className="text-white nav-link d-flex align-items-center gap-2">
                    <Home size={20} /> Dashboard
                </Link>
                <div className="nav-item">
                    <button
                        className="text-white nav-link d-flex align-items-center justify-content-between gap-2 w-100 btn btn-link px-2"
                        onClick={() => setShowSubmenu(!showSubmenu)}
                        style={{ textAlign: 'left' }}
                    >
                        <span className="d-flex align-items-center gap-2">
                            <FileText size={20} /> Meus Serviços
                        </span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform ${showSubmenu ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {showSubmenu && (
                        <div className="ms-4 d-flex flex-column gap-1 ps-2 border-start border-secondary">
                            <Link to="/myservices" className="text-white nav-link ps-2 py-1">
                                Lista de Serviços
                            </Link>
                            <Link to="/mycategory" className="text-white nav-link ps-2 py-1">
                                Lista de categorias
                            </Link>
                        </div>
                    )}
                </div>

                <Link to="/meus-clientes" className="text-white nav-link d-flex align-items-center gap-2">
                    <User size={20} /> Meus Clientes
                </Link>
                <Link to="/notificacoes" className="text-white nav-link d-flex align-items-center gap-2">
                    <Bell size={20} /> Notificações
                </Link>
                <Link to="/config" className="text-white nav-link d-flex align-items-center gap-2">
                    <Settings size={20} /> Configurações
                </Link>
            </nav>

            <nav className="nav flex-column gap-2 mt-auto">
                <Link to="/logout" className="text-white nav-link d-flex align-items-center gap-2">
                    <LogOut size={20} /> Sair
                </Link>
            </nav>
        </aside>
    );
}
