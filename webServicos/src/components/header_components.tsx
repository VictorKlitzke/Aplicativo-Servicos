import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "../interface";
import { getLogin } from "../services/get";

export default function HeaderComponents() {
    const [showCard, setShowCard] = useState(false);
    const [user, setUser] = useState<Users>();

    const handleMouseEnter = () => {
        setShowCard(true);
    };
    const handleMouseLeave = () => {
        setShowCard(false);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await getLogin();
                setUser(result.getLogin[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <header className="bg-light shadow-sm p-3 d-flex justify-content-between align-items-center">
            <h4 className="m-0">Dashboard</h4>
            <div
                className="d-flex align-items-center gap-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    src={user?.avatar ? `data:image/jpeg;base64,${user.avatar}` : "F"}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ cursor: 'pointer' }}
                />

                <span
                    className="d-flex align-items-center"
                    style={{ cursor: 'pointer' }}
                >
                    Olá, {user?.nome}
                </span>

                {showCard && (
                    <div
                        className="dropdown-menu show"
                        style={{
                            position: 'absolute',
                            top: '50px',
                            right: '0',
                            zIndex: 9999,
                            width: '150px',
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to='/profile' className="text-white nav-link d-flex align-items-center gap-2">
                            <button className="dropdown-item">Perfil</button>
                        </Link>
                        <button className="dropdown-item">Configurações</button>
                        <button className="dropdown-item">Sair</button>
                    </div>
                )}
            </div>
        </header>
    );
}
