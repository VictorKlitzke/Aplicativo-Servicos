import { FileText, Eye } from "lucide-react";
import ListPage from "../base/list_page";
import { Button } from "react-bootstrap";
import ModalComponents from "../../../components/modal/details_components";
import { useMyServices } from "../../../hooks/services/useMyServices";
import { TransitionComponents } from "../../../components/shared/transition_components";

export default function MyServicesPage() {
  const {
    handleCloseModal,
    handleOpenModal,
    services,
    selectedService,
    showModal,
  } = useMyServices();

  return (
    <>
      <TransitionComponents>
        <ListPage
          title="Meus Serviços"
          createLink="/createservices/new"
          items={services}
          icon={<FileText size={24} />}
          renderItem={(service) => (
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <FileText size={20} className="text-primary" />
                  <h5 className="card-title m-0">{service.SERVICO}</h5>
                </div>
                <p className="card-text text-muted">
                  {service.DESCRICAOSERVICO}
                </p>
                <div className="mt-auto d-flex justify-content-end">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="d-flex align-items-center gap-1"
                    onClick={() => handleOpenModal(service)}
                  >
                    <Eye size={16} /> Detalhes
                  </Button>
                </div>
              </div>
            </div>
          )}
        />

        <ModalComponents
          show={showModal}
          onClose={handleCloseModal}
          title="Detalhes do Serviço"
          footer={
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
          }
        >
          {selectedService && (
            <div>
              <p>
                <strong>Serviço:</strong> {selectedService.SERVICO}
              </p>
              <p>
                <strong>Descrição:</strong> {selectedService.DESCRICAOSERVICO}
              </p>
              <p>
                <strong>Categoria:</strong> {selectedService.CATEGORIA}
              </p>
              <p>
                <strong>Duração:</strong> {selectedService.DURACAOSERVICO} min
              </p>
              <p>
                <strong>Preço:</strong> R$ {selectedService.PRECO}
              </p>
              <p>
                <strong>Profissional:</strong> {selectedService.PROFISSIONAL}
              </p>
            </div>
          )}
        </ModalComponents>
      </TransitionComponents>
    </>
  );
}
