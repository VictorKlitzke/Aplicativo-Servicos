import React from "react";
import { FileText, PlusCircle, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyServicesPage() {
  const services = [
    { id: 1, nome: "Consultoria em TI", descricao: "Análise e soluções de TI para empresas." },
    { id: 2, nome: "Dev Web", descricao: "Criação de sites, sistemas e APIs." },
    { id: 3, nome: "Suporte Técnico", descricao: "Manutenção e suporte remoto." },
  ];

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0">📋 Meus Serviços</h3>
        <Link to="/createservices" className="btn btn-success d-flex align-items-center gap-2">
          <PlusCircle size={18} /> Novo Serviço
        </Link>
      </div>

      <div className="row g-3">
        {services.map((service) => (
          <div key={service.id} className="col-md-6 col-lg-4">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <FileText size={20} className="text-primary" />
                  <h5 className="card-title m-0">{service.nome}</h5>
                </div>
                <p className="card-text text-muted">{service.descricao}</p>
                <div className="mt-auto d-flex justify-content-end">
                  <Link to={`/servico/${service.id}`} className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
                    <Eye size={16} /> Detalhes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
