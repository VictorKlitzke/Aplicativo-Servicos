import React from "react";
import { Bell } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { TransitionComponents } from "../../../components/shared/transition_components";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Solicitação Aprovada",
    message: "Sua solicitação foi aprovada com sucesso.",
    time: "2 min atrás",
    read: false,
  },
  {
    id: 2,
    title: "Novo Comentário",
    message: "Um usuário comentou no seu serviço.",
    time: "10 min atrás",
    read: true,
  },
  {
    id: 3,
    title: "Atualização de Status",
    message: "O status do serviço foi alterado.",
    time: "1 hora atrás",
    read: false,
  },
];

export const NotificationPage: React.FC = () => {
  return (
    <>
      <TransitionComponents>
        <div className="container py-5">
          <div className="d-flex align-items-center mb-4">
            <Bell className="text-primary me-2" size={28} />
            <h3 className="fw-bold m-0 text-primary">Notificações</h3>
          </div>

          <div className="list-group shadow-sm rounded overflow-hidden">
            {mockNotifications.map((notif) => (
              <div
                key={notif.id}
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${
                  notif.read ? "bg-light" : "bg-white"
                }`}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{notif.title}</div>
                  <small className="text-muted">{notif.message}</small>
                </div>
                <small className="text-secondary">{notif.time}</small>
              </div>
            ))}
          </div>
        </div>
      </TransitionComponents>
    </>
  );
};
