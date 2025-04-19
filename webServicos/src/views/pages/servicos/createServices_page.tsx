// src/views/pages/servicos/CreateService.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateServicePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    preco: "",
    descricao: "",
    tempoExecucao: "",
    cidade: "",
    estado: "",
    tipoAtendimento: "presencial", // presencial, online, ambos
    imagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Serviço cadastrado:", formData);
    navigate("/meus-servicos");
  };

  return (
    <div className="container-fluid p-4">
      <h3 className="mb-4">➕ Cadastrar Novo Serviço</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Título do Serviço</label>
          <input
            type="text"
            className="form-control"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Categoria</label>
          <input
            type="text"
            className="form-control"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Preço (R$)</label>
          <input
            type="number"
            className="form-control"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Tempo Estimado de Execução</label>
          <input
            type="text"
            className="form-control"
            name="tempoExecucao"
            placeholder="Ex: 1h, 2 dias, etc."
            value={formData.tempoExecucao}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Cidade</label>
          <input
            type="text"
            className="form-control"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Estado</label>
          <input
            type="text"
            className="form-control"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Tipo de Atendimento</label>
          <select
            className="form-select"
            name="tipoAtendimento"
            value={formData.tipoAtendimento}
            onChange={handleChange}
          >
            <option value="presencial">Presencial</option>
            <option value="online">Online</option>
            <option value="ambos">Ambos</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">URL da Imagem do Serviço (opcional)</label>
          <input
            type="text"
            className="form-control"
            name="imagem"
            value={formData.imagem}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            rows={5}
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className="btn btn-success px-4">Salvar Serviço</button>
        </div>
      </form>
    </div>
  );
}
