import { Bell, User, Settings, Trash2 } from "lucide-react";
import { useConfig } from "../../../hooks/config/useConfig";
import { TransitionComponents } from "../../../components/shared/transition_components";

export default function ConfigPage() {
  const {
    confirmDelete,
    handleDelete,
    handleSubmit,
    saved,
    showDeleteConfirm,
    setShowDeleteConfirm,
  } = useConfig();

  return (
    <TransitionComponents>
      <div className="container-fluid p-4">
        <h3 className="mb-4 d-flex align-items-center gap-2">
          <Settings size={22} /> Configurações
        </h3>

        {saved && (
          <div className="alert alert-success" role="alert">
            Configurações salvas com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit} className="row g-4">
          <div className="col-12">
            <div className="bg-white shadow-sm rounded p-4">
              <h5 className="mb-3 d-flex align-items-center gap-2">
                <User size={20} /> Informações da Conta
              </h5>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nova Senha</label>
                  <input type="password" className="form-control" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Senha Atual</label>
                  <input type="password" className="form-control" required />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="bg-white shadow-sm rounded p-4">
              <h5 className="mb-3 d-flex align-items-center gap-2">
                <Bell size={20} /> Preferências e Notificações
              </h5>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="notif1"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="notif1">
                  Receber notificações por email
                </label>
              </div>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="notif2"
                />
                <label className="form-check-label" htmlFor="notif2">
                  Receber notificações por SMS
                </label>
              </div>

              <div className="mb-3">
                <label className="form-label">Tema</label>
                <select className="form-select">
                  <option>Claro</option>
                  <option>Escuro</option>
                  <option>Automático</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-between">
            <button type="submit" className="btn btn-primary px-4">
              Salvar Alterações
            </button>

            <button
              type="button"
              className="btn btn-outline-danger d-flex align-items-center gap-2"
              onClick={handleDelete}
            >
              <Trash2 size={16} /> Excluir Conta
            </button>
          </div>
        </form>
        {showDeleteConfirm && (
          <div className="modal d-block bg-dark bg-opacity-50">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar Exclusão</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeleteConfirm(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  Tem certeza que deseja excluir sua conta? Essa ação não pode
                  ser desfeita.
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-danger" onClick={confirmDelete}>
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </TransitionComponents>
  );
}
