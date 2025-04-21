import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../../services/post";
import usePreventBack from "../../../hooks";
import { MessageInterface } from "../../../interface";
import MessageComponets from "../../../components/modal/message_components";

export default function LoginPage() {
  usePreventBack();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState<MessageInterface>({
    show: false,
    message: "",
    type: "info",
  });
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email: email,
      senha: password,
    };
    try {
      const response = await postLogin(data);
      if (response.success) {
        navigate("/homePage");
      } else {
        setModal({
          show: true,
          message: "Credenciais inválidas.",
          type: "info",
        });
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setModal({
        show: true,
        message: "Erro ao tentar logar. Tente novamente mais tarde.",
        type: "error",
      });
    }
  };

  return (
    <>
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
