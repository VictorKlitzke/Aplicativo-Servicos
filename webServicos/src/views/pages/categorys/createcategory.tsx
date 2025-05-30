import CreatePage from "../base/create_page";
import MessageComponets from "../../../components/modal/message_components";
import { useCreateCategoryHooks } from "../../../hooks/createcategory_hook";

export default function CreateCategorysPage() {
    const {
        handleSubmit, 
        modal,
        setCategoria,
        categoria,
        setModal
    } = useCreateCategoryHooks();

    return (
        <>
            <CreatePage
                title="➕ Cadastrar Categoria"
                onSubmit={handleSubmit}
                fields={[
                    {
                        label: "Categoria",
                        name: "categoria",
                        type: "text",
                        value: categoria,
                        onChange: (e) => setCategoria(e.target.value),
                    },
                ]}
            />
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
