import CreatePage from "../base/create_page";
import MessageComponets from "../../../components/modal/message_components";
import { useEffect } from "react";
import { useCreateServices } from "../../../hooks/services/useCreateServices";
import { TransitionComponents } from "../../../components/shared/transition_components";

export default function CreateServicePage() {
  const {
    modal,
    setModal,
    handleChange,
    handleSubmit,
    fetchCEP,
    categorias,
    loading,
    formData,
    fetchCategorys,
  } = useCreateServices();

  useEffect(() => {
    fetchCategorys();
  }, []);

  return (
    <>
      <TransitionComponents>
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
      </TransitionComponents>
    </>
  );
}
