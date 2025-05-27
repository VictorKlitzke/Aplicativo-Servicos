import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Search, Clock, DollarSign, User } from "lucide-react";
import { Service } from "../../../interface";
import LoadingComponents from "../../../components/loading/loading_components";
import { getServicesAgendamento } from "../../../services/get";
import ListPage from "../base/list_page";

export default function AvailableServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServicesAgendamento();
        setServices(response.getServicesAgendamento);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services
    .filter(service =>
      service.SERVICO.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === "" || service.CATEGORIA === categoryFilter)
    )
    .sort((a, b) => {
      if (priceOrder === "asc") {
        return a.PRECO - b.PRECO;
      } else {
        return b.PRECO - a.PRECO;
      }
    });

  if (isLoading) {
    return <LoadingComponents show={true} />;
  }

  const categoriasUnicas = Array.from(new Set(services.map(s => s.CATEGORIA)));

  const renderServiceItem = (service: Service) => (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title d-flex align-items-center gap-2 text-primary">
          <FileText size={20} /> {service.SERVICO}
        </h5>

        <p
          className="card-text flex-grow-1 overflow-hidden"
          style={{ maxHeight: "100px", textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {service.DESCRICAOSERVICO}
        </p>

        <div className="mt-2">
          <small className="d-block text-muted">
            <b>Categoria:</b> {service.CATEGORIA}
          </small>
          <small className="d-flex align-items-center gap-1 text-muted mt-1">
            <User size={16} /> {service.PROFISSIONAL}
          </small>
          <small className="d-flex align-items-center gap-1 text-muted mt-1">
            <Clock size={16} /> Duração: {service.DURACAOSERVICO}
          </small>
          <small className="d-flex align-items-center gap-1 text-muted mt-1">
            <DollarSign size={16} /> Preço: R$ {service.PRECO}
          </small>
        </div>

        <div className="mt-auto">
          <Link
            to={`/servico/${service.ID}`}
            className="btn btn-primary w-100 mt-3"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>

  );

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center fw-bold">Serviços Disponíveis</h1>

      {/* Área de Busca e Filtros */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-dark text-white">
              <Search size={20} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar serviço..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Todas Categorias</option>
            {categoriasUnicas.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={priceOrder}
            onChange={(e) => setPriceOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Preço: Menor para Maior</option>
            <option value="desc">Preço: Maior para Menor</option>
          </select>
        </div>
      </div>

      <ListPage
        items={filteredServices}
        renderItem={renderServiceItem}
      />
    </div>
  );
}
