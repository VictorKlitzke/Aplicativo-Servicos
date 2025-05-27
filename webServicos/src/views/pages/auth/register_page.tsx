import { Link } from "react-router-dom";
import { useRegisterHooks } from "../../../hooks/register_hooks";
import { formatPhone } from "../../../utils";

export default function RegisterPage() {
    const {
        handleRegister,
        setName,
        setEmail,
        setPassword,
        setPersonType,
        setPhone,
        name,
        email,
        password,
        phone,
        typePerson
    } = useRegisterHooks();

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
