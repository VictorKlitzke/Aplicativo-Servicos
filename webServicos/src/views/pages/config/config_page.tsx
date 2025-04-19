import React from "react";
import { Bell, User, Settings } from "lucide-react";

export default function ConfigPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Configurações salvas");
    };

    return (
        <div className="container-fluid p-4">
            <h3 className="mb-4 d-flex align-items-center gap-2">
                <Settings size={22} /> Configurações
            </h3>

            <form onSubmit={handleSubmit} className="row g-4">
                {/* Seção de Conta */}
                <div className="col-12">
                    <div className="bg-white shadow-sm rounded p-4">
                        <h5 className="mb-3 d-flex align-items-center gap-2">
                            <User size={20} /> Informações da Conta
                        </h5>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Nome</label>
                                <input type="text" className="form-control" defaultValue="Victor" required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" defaultValue="victor@email.com" required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Telefone</label>
                                <input type="tel" className="form-control" placeholder="(99) 99999-9999" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Nova Senha</label>
                                <input type="password" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seção de Preferências */}
                <div className="col-12">
                    <div className="bg-white shadow-sm rounded p-4">
                        <h5 className="mb-3 d-flex align-items-center gap-2">
                            <Bell size={20} /> Preferências e Notificações
                        </h5>

                        <div className="form-check form-switch mb-3">
                            <input className="form-check-input" type="checkbox" role="switch" id="notif1" defaultChecked />
                            <label className="form-check-label" htmlFor="notif1">Receber notificações por email</label>
                        </div>
                        <div className="form-check form-switch mb-3">
                            <input className="form-check-input" type="checkbox" role="switch" id="notif2" />
                            <label className="form-check-label" htmlFor="notif2">Receber notificações por SMS</label>
                        </div>
                    </div>
                </div>

                {/* Botão */}
                <div className="col-12 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary px-4">Salvar Alterações</button>
                </div>
            </form>
        </div>
    );
}
