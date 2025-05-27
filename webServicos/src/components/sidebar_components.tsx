import { Home, FileText, User, Bell, Settings, LogOut, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageInterface, Users } from "../interface";
import LoadingComponents from "./loading/loading_components";
import MessageComponets from "./modal/message_components";
import { getLogin } from "../services/get";
import { postLogout } from "../services/post";

export default function SidebarComponents() {
    const [users, setUsers] = useState<Users | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [modal, setModal] = useState<MessageInterface>({
        show: false,
        message: "",
        type: "info",
    });
    const [showSubmenu, setShowSubmenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getLogin();
                setUsers(response.getLogin[0]);
            } catch (error) {
                console.error("Erro no login:", error);
                setModal({
                    show: true,
                    message: "Erro ao tentar logar. Tente novamente mais tarde.",
                    type: "error",
                });
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    const Logout = async () => {
        setLoading(true);
        try {
            const response = await postLogout();

            if (response.success) {
                navigate("/login");
            } else {
                setModal({
                    show: true,
                    message: "Erro ao tentar sair do site. Tente novamente mais tarde.",
                    type: "error",
                });
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (isLoading || !users) {
        return <LoadingComponents show={true} />;
    }

    return (
        <>
            <aside className="bg-dark text-white p-3 d-flex flex-column" style={{ height: '100vh', width: '250px' }}>
                <h2 className="mb-4"></h2>

                <nav className="nav flex-column gap-2 flex-grow-1">
                    <Link to="/dashboard" className="text-white nav-link d-flex align-items-center gap-2">
                        <Home size={20} /> Dashboard
                    </Link>

                    {users.tipo !== 'cliente' ? (
                        <>
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
                                            Lista de Categorias
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link to="/meus-clientes" className="text-white nav-link d-flex align-items-center gap-2">
                                <User size={20} /> Meus Clientes
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/availableservices" className="text-white nav-link d-flex align-items-center gap-2">
                                <FileText size={20} /> Serviços Disponíveis
                            </Link>
                            <Link to="/meus-pedidos" className="text-white nav-link d-flex align-items-center gap-2">
                                <User size={20} /> Meus Pedidos
                            </Link>
                        </>
                    )}

                    <Link to="/notificacoes" className="text-white nav-link d-flex align-items-center gap-2">
                        <Bell size={20} /> Notificações
                    </Link>
                    <Link to="/config" className="text-white nav-link d-flex align-items-center gap-2">
                        <Settings size={20} /> Configurações
                    </Link>
                </nav>

                <nav className="nav flex-column gap-2 mt-auto">
                    <Link onClick={Logout} to="/login" className="text-white nav-link d-flex align-items-center gap-2">
                        <LogOut size={20} /> Sair
                    </Link>
                </nav>
            </aside>

            <MessageComponets
                show={modal.show}
                type={modal.type}
                title={modal.type}
                message={modal.message}
                onClose={() => setModal({ ...modal, show: false })}
            />
        </>
    );
}
