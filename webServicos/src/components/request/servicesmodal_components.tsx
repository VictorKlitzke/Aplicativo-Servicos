import { useState } from 'react';
import { Service } from '../../interface';

interface RequestServiceModalProps {
  service: Service;
  onClose: () => void;
}

const RequestServiceModal = ({ service, onClose }: RequestServiceModalProps) => {
  const [userData, setUserData] = useState({ address: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simula a solicitação do serviço
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Solicitação realizada com sucesso!');
      onClose(); // Fecha o modal após sucesso
    } catch (error) {
      alert('Ocorreu um erro. Tente novamente.' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} aria-modal="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Solicitação</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Você está prestes a solicitar o serviço <strong>{service.SERVICO}</strong>.</p>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Endereço</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                placeholder="Informe o endereço"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Telefone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                placeholder="Informe seu telefone"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Solicitando...' : 'Confirmar Solicitação'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestServiceModal;
