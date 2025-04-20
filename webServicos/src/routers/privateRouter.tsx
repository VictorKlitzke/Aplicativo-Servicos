import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${apiUrl}validateToken`, {
                    method: 'GET',
                    credentials: 'include',
                });

                setIsAuthenticated(response.ok);
            } catch (error) {
                console.error('Erro na validação do token:', error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                    <div className="mt-3 fs-5 text-secondary">Verificando autenticação...</div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
