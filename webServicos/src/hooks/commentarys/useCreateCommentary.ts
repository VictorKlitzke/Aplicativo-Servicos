import { useState } from "react";
import { Commentarys, Service } from "../../interface";
import { postCommentarys } from "../../services/post";
import { useParams } from "react-router-dom";
import { getComentarys, getServicesAgendamento } from "../../services/get";

export function useCommentarys() {
    const [message, setMessage] = useState<Commentarys[]>([]);
    const { id } = useParams<{ id: string }>();
    const [service, setService] = useState<Service | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

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
                const adaptado = response.getComentarios.map((comentario: Commentarys) => ({
                    user: `Usuário #${comentario.usuario_id}`,
                    comment: comentario.message
                }));
                setMessage(adaptado);
            } catch (error) {
                console.error(error);
            }
        }
    const handleSubmit = async () => {
        try {

            const data = {
                message: message,
                usuario_id: 1,
                servico_id: 1
            }

            console.log(data)

            const response = await postCommentarys(data) 

            if (response != null) return true;

        } catch (error) {
            console.log(error);
        }
    }

    return {
        handleSubmit, 
        fetchComentarios,
        service,
        fetchService,
        modalVisible,
        setModalVisible,
        message,
        setMessage
    }
}