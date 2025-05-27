import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageData, Service } from "../../../../interface";
import RequestServiceModal from "../../../../components/request/servicesmodal_components";
import CommentComponents from "../../../../customizable/comment_components";
import { getComentarys, getServicesAgendamento } from "../../../../services/get";

export default function ServiceDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [service, setService] = useState<Service | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState<MessageData[]>([]);

    useEffect(() => {
        const fetchService = async () => {
            if (!id) {
                console.error("ID não encontrado na URL");
                return;
            }
            try {
                const response = await getServicesAgendamento();
                const serviceFound = response.getServicesAgendamento.find(
                    (service: Service) => service.ID === parseInt(id)
                );
                setService(serviceFound || null);
            } catch (error) {
                console.error("Erro ao carregar o serviço:", error);
            }
        };

        const fetchComentarios = async () => {
            if (!id) {
                console.error("ID não encontrado na URL");
                return;
            }
            try {
                const response = await getComentarys(id);
                const adaptado = response.getComentarios.map((comentario: MessageData) => ({
                    user: `Usuário #${comentario.usaurio}`,
                    comment: comentario.comentario
                }));
                setMessage(adaptado);
            } catch (error) {
                console.error(error);
            }
        }

        fetchService();
        if (id) fetchComentarios();
    }, [id]);
    const handleCommentSubmit = () => {
    };

    return (
        <>
            <div className="container py-4">
                <h1 className="text-center fw-bold mb-5 text-primary">Detalhes do Serviço</h1>

                {service ? (
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center mb-4 mb-md-0">
                            <img
                                src="public/images/landingpage.jpg"
                                alt="Serviço"
                                className="img-fluid rounded shadow-lg"
                                style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'fill' }}
                            />
                        </div>

                        <div className="col-md-6">
                            <div className="card shadow-sm p-4 border-0 rounded">
                                <h2 className="card-title text-primary">{service.SERVICO}</h2>
                                <p className="text-muted"><strong>Descrição:</strong> {service.DESCRICAOSERVICO}</p>
                                <p><strong>Categoría:</strong> {service.CATEGORIA}</p>
                                <p><strong>Profissional:</strong> {service.PROFISSIONAL}</p>
                                <p><strong>Duração:</strong> {service.DURACAOSERVICO}</p>
                                <p><strong>Preço:</strong> R$ {service.PRECO}</p>

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
                    <RequestServiceModal service={service} onClose={() => setModalVisible(false)} />
                )}

                <div className="my-5">
                    <h4 className="mb-3">Deixe seu comentário</h4>
                    <CommentComponents
                        placeholder="Compartilhe sua experiência ou opinião..."
                        maxLength={300}
                        comments={message}
                        onSubmit={handleCommentSubmit}
                    />
                </div>
            </div>
        </>
    );
}
