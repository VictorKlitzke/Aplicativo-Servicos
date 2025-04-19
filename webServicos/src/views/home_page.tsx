import React from "react";

export default function HomePage() {
    return (
        <div className="d-flex vh-100">

            <div className="flex-grow-1 d-flex flex-column">

                <main className="p-4 flex-grow-1 overflow-auto">
                    <div className="row g-4">

                        <div className="col-md-4">
                            <div className="p-4 rounded shadow-sm h-100 bg-light">
                                <h5 className="fw-bold">Bem-vindo de volta 👋</h5>
                                <p>Explore os recursos da plataforma e gerencie suas atividades facilmente.</p>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="p-4 rounded shadow-sm h-100 bg-light">
                                <h5 className="fw-bold mb-3">Resumo Rápido</h5>
                                <ul className="list-group">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Novos usuários
                                        <span className="badge bg-primary rounded-pill">15</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Solicitações pendentes
                                        <span className="badge bg-warning text-dark rounded-pill">7</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Atendimentos finalizados
                                        <span className="badge bg-success rounded-pill">31</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="p-4 rounded shadow-sm h-100 bg-light">
                                <h5 className="fw-bold mb-3">Alertas</h5>
                                <div className="alert alert-warning" role="alert">
                                    <strong>Atenção!</strong> Você tem novas solicitações pendentes.
                                </div>
                                <div className="alert alert-info" role="alert">
                                    <strong>Nota:</strong> A plataforma será atualizada amanhã.
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="p-4 rounded shadow-sm h-100 bg-light">
                                <h5 className="fw-bold mb-3">Visão Geral</h5>
                                <div className="bg-dark text-white p-4 rounded">
                                    <h6>Gráfico de Usuários</h6>
                                    <p>Gráfico de linha ou barra representando o crescimento de usuários nos últimos meses.</p>
                                    {/* Aqui você pode adicionar um gráfico real usando bibliotecas como Chart.js ou Recharts */}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-4">
                        <h5 className="fw-bold mb-3">Atividades Recentes</h5>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Usuário</th>
                                        <th scope="col">Atividade</th>
                                        <th scope="col">Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>John Doe</td>
                                        <td>Registrou uma nova solicitação</td>
                                        <td>18/04/2025</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jane Smith</td>
                                        <td>Concluiu o atendimento #102</td>
                                        <td>17/04/2025</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Michael Johnson</td>
                                        <td>Solicitou um novo orçamento</td>
                                        <td>16/04/2025</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
