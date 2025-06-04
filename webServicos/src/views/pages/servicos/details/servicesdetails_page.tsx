import { useCommentarys } from "../../../../hooks/exports";
import CommentComponents from "../../../../customizable/comment_components";
import RequestServiceModal from "../../../../components/request/servicesmodal_components";

export default function ServiceDetailPage() {
  const { handleSubmit, service, modalVisible, setModalVisible, message } =
    useCommentarys();

  return (
    <>
      <div className="container py-4">
        <h1 className="text-center fw-bold mb-5 text-primary">
          Detalhes do Serviço
        </h1>

        {service ? (
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
              <img
                src="public/images/landingpage.jpg"
                alt="Serviço"
                className="img-fluid rounded shadow-lg"
                style={{
                  maxWidth: "100%",
                  maxHeight: "400px",
                  objectFit: "fill",
                }}
              />
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm p-4 border-0 rounded">
                <h2 className="card-title text-primary">{service.SERVICO}</h2>
                <p className="text-muted">
                  <strong>Descrição:</strong> {service.DESCRICAOSERVICO}
                </p>
                <p>
                  <strong>Categoría:</strong> {service.CATEGORIA}
                </p>
                <p>
                  <strong>Profissional:</strong> {service.PROFISSIONAL}
                </p>
                <p>
                  <strong>Duração:</strong> {service.DURACAOSERVICO}
                </p>
                <p>
                  <strong>Preço:</strong> R$ {service.PRECO}
                </p>

                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => setModalVisible(true)}
                >
                  Solicitar Serviço
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        )}

        {modalVisible && service && (
          <RequestServiceModal
            service={service}
            onClose={() => setModalVisible(false)}
          />
        )}

        <div className="my-5">
          <h4 className="mb-3">Deixe seu comentário</h4>
          <CommentComponents
            placeholder="Compartilhe sua experiência ou opinião..."
            maxLength={300}
            comments={(message ?? []).map((item) => ({
              user: `Usuário ${item.usuario_id}`, 
              comment: item.message,
            }))}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}
