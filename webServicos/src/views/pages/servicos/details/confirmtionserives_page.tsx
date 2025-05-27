import { useLocation } from 'react-router-dom';

export default function ConfirmationPage() {
  const location = useLocation();
  const { success } = location.state || { success: false };

  return (
    <div className="container py-4">
      <h1 className="text-center fw-bold">{success ? 'Solicitação Confirmada!' : 'Erro ao Solicitar Serviço'}</h1>
      <p className="text-center">
        {success ? 'Aguarde o contato do profissional para agendar o serviço.' : 'Ocorreu um erro. Tente novamente mais tarde.'}
      </p>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={() => window.location.href = "/confirmation"}>Voltar para Home</button>
      </div>
    </div>
  );
};