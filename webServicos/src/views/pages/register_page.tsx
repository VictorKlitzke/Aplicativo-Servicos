import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { formatPhone } from '../../utils';
import { postRegister } from '../../services/post';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [typePerson, setPersonType] = useState<'cliente' | 'profissional'>('cliente');
    const navigate = useNavigate();

    const validateFields = () => {
        if (!name.trim()) {
            alert('Nome é obrigatório');
            return false;
        }
        if (!email.trim() || !email.includes('@')) {
            alert('Email inválido');
            return false;
        }
        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres');
            return false;
        }
        if (phone.length < 14) {
            alert('Telefone inválido');
            return false;
        }

        return true;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFields()) return;

        const data = {
            nome: name,
            email: email,
            telefone: phone,
            password: password,
            userType: typePerson,
        };

        try {
            const registeredUser = await postRegister(data);

            localStorage.setItem('user', JSON.stringify(registeredUser));

            navigate('/');
        } catch (error) {
            console.error('Erro no registro:', error);
        }
    };

    return (
        <>
            <div
                className="vh-100 vw-100 d-flex align-items-center justify-content-center"
                style={{
                    background: 'linear-gradient(to right, rgb(28, 28, 28) 50%, #2575fc 50%)',
                }}
            >
                <form
                    className="p-4 border rounded-4 shadow-lg bg-white w-100"
                    style={{ maxWidth: 400 }}
                    onSubmit={handleRegister}
                >
                    <h3 className="mb-4 text-center fw-bold" style={{ color: '#6a11cb' }}>Cadastro</h3>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label htmlFor="name">Nome</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="email@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="senha"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="senha">Senha</label>
                    </div>

                    <div className="form-floating mb-4">
                        <input
                            type="tel"
                            className="form-control"
                            id="telefone"
                            placeholder="(65) 99999-9999"
                            value={phone}
                            onChange={(e) => setPhone(formatPhone(e.target.value))}
                            required
                        />
                        <label htmlFor="telefone">Telefone</label>
                    </div>

                    <div className="form-floating mb-3">
                        <select
                            className="form-select"
                            id="personType"
                            value={typePerson}
                            onChange={(e) => setPersonType(e.target.value as 'cliente' | 'profissional')}
                            required
                        >
                            <option value="cliente">Cliente</option>
                            <option value="profissional">Profissional</option>
                        </select>
                        <label htmlFor="personType">Tipo de Pessoa</label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fw-semibold">
                        Cadastrar
                    </button>

                    <div className="text-center mt-3">
                        <Link to="/" className="text-decoration-none" style={{ color: '#2575fc' }}>
                            Já tem conta? Entrar
                        </Link>
                    </div>
                </form>
            </div>
        </>

    );
}
