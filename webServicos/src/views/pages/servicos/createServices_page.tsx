import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePage from "../base/create_page";
import { Categoria, MessageInterface, ServicesData } from "../../../interface";
import MessageComponets from "../../../components/modal/message_components";
import { getCategorys, getCEP } from "../../../services/get";
import { postServices } from "../../../services/post";

export default function CreateServicePage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<MessageInterface>({
    show: false,
    message: "",
    type: "info",
  });

  const [categorias, setCategorys] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ServicesData>({
    titulo: "",
    categoria: "",
    preco: "",
    descricao: "",
    tempoExecucao: "",
    cidade: "",
    cep: "",
    estado: "",
    tipoAtendimento: "presencial",
    imagem: "",
  });

  useEffect(() => {
    const fetchCategorys = async () => {
      setLoading(true);
      try {
        const result = await getCategorys();
        setCategorys(result.getCategorys);
      } catch (error) {
        setModal({
          show: true,
          message: "Erro ao buscar as categorias.",
          type: "error",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorys();
  }, []);

  const fetchCEP = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const updatedValue = name === "cep" ? value.replace(/\D/g, "") : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    if (name === "cep" && updatedValue.length === 8) {
      try {
        const endereco = await getCEP(updatedValue);
        setFormData((prev) => ({
          ...prev,
          cidade: endereco.getCEP.city || "",
          estado: endereco.getCEP.state || "",
        }));
      } catch (error) {
        setModal({
          show: true,
          message: "CEP inválido ou não encontrado.",
          type: "error",
        });
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isNaN(Number(formData.preco))) {
      formData.preco = `R$ ${parseFloat(formData.preco).toFixed(2)}`;
    }

    console.log(formData)

    if (validateForm()) {
      const response = await postServices(formData);

      if (response.success) {
        setModal({
          show: true,
          message: "Sucesso, serviço registrado",
          type: "success",
        });

        navigate('/myservices');
      }
    } else {
      console.log("Por favor, preencha todos os campos obrigatórios.");
      setModal({
        show: true,
        message: "Por favor, preencha todos os campos obrigatórios.",
        type: "error",
      });
    }
  };

  const validateForm = () => {
    return (
      formData.titulo &&
      formData.categoria &&
      formData.preco &&
      formData.tempoExecucao &&
      formData.cep &&
      formData.tempoExecucao &&
      formData.cidade &&
      formData.estado
    );
  };

  return (
    <>
      <CreatePage
        title="➕ Cadastrar Novo Serviço"
        onSubmit={handleSubmit}
        submitLabel="Salvar Serviço"
        fields={[
          {
            label: "Título do Serviço",
            name: "titulo",
            type: "text",
            value: formData.titulo,
            onChange: handleChange,
          },
          {
            label: "Categoria",
            name: "categoria",
            type: "select",
            value: formData.categoria,
            onChange: handleChange,
            options: categorias.map((categoria) => ({
              label: categoria.CATEGORIA,
              value: String(categoria.ID),
            })),
          },
          {
            label:
              formData.preco === "custom" ? "Digite o valor (R$)" : "Preço",
            name: "preco",
            type: formData.preco === "custom" ? "number" : "text",
            value: formData.preco,
            onChange: handleChange,
          },
          {
            label: "Tempo Estimado de Execução",
            name: "tempoExecucao",
            type: "select",
            value: formData.tempoExecucao,
            onChange: handleChange,
            options: [
              { label: "Menos de 30 minutos", value: "menos_30_min" },
              { label: "30 minutos a 1 hora", value: "30_60_min" },
              { label: "1 a 2 horas", value: "1_2_horas" },
              { label: "1 dia", value: "1_dia" },
              { label: "Vários dias", value: "varios_dias" },
              { label: "A combinar", value: "a_combinar" },
            ],
          },
          {
            label: "CEP",
            name: "cep",
            type: "number",
            value: formData.cep,
            onChange: fetchCEP,
          },
          {
            label: "Cidade",
            name: "cidade",
            type: "text",
            value: formData.cidade,
            readonly: true,
            onChange: handleChange,
          },
          {
            label: "Estado",
            name: "estado",
            type: "text",
            value: formData.estado,
            readonly: true,
            onChange: handleChange,
          },
          {
            label: "Tipo de Atendimento",
            name: "tipoAtendimento",
            type: "select",
            value: formData.tipoAtendimento,
            onChange: handleChange,
            options: [
              { label: "Presencial", value: "presencial" },
              { label: "Online", value: "online" },
              { label: "Ambos", value: "ambos" },
            ],
          },
          // {
          //   label: "URL da Imagem do Serviço (opcional)",
          //   name: "imagem",
          //   type: "text",
          //   value: formData.imagem,
          //   onChange: handleChange,
          // },
          {
            label: "Descrição",
            name: "descricao",
            type: "textarea",
            value: formData.descricao,
            onChange: handleChange,
          },
        ]}
      />
      {loading && <div>Carregando categorias...</div>}
      <MessageComponets
        show={modal.show}
        type={modal.type}
        title={modal.type}
        message={modal.message}
        onClose={() => setModal({ ...modal, show: false })}
      />
    </>
  );
}
