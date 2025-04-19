import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center p-5 bg-white shadow-lg rounded-4 w-75 w-md-50">
        {/* Ícone de erro */}
        <div className="mb-4">
          <img
            src="https://img.icons8.com/ios/452/error.png"
            alt="error icon"
            width="120"
            height="120"
          />
        </div>

        {/* Título e Descrição */}
        <h2 className="text-danger fw-bold mb-3">Página Não Encontrada</h2>
        <p className="mb-4 text-muted">
          A URL que você tentou acessar não existe ou você não tem permissão para vê-la.
        </p>

        <Link to="/" className="btn btn-primary btn-lg fw-semibold">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}
