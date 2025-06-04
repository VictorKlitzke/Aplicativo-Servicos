import MessageComponets from "../../../components/modal/message_components";
import LoadingComponents from "../../../components/loading/loading_components";
import { Link } from "react-router-dom";
import { useLogin } from "@hooks";

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoanding,
    modal,
    handleLogin,
    setModal
  } = useLogin();

  return (
    <>
    <LoadingComponents show={isLoanding} />
      <div
        className="vh-100 d-flex align-items-center justify-content-center"
        style={{
          background:
            "linear-gradient(to right,rgb(28, 28, 28) 50%, #2575fc 50%)",
        }}
      >
        <form
          className="p-4 border rounded-4 shadow-lg bg-white w-100"
          style={{ maxWidth: 400 }}
          onSubmit={handleLogin}
        >
          <h3 className="mb-4 text-center fw-bold" style={{ color: "#6a11cb" }}>
            Login
          </h3>

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

          <div className="form-floating mb-4">
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

          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Entrar
          </button>

          <div className="text-center mt-3">
            <Link
              to="/register"
              className="text-decoration-none"
              style={{ color: "#2575fc" }}
            >
              Não tem conta? Cadastre-se
            </Link>
          </div>
        </form>
      </div>
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
