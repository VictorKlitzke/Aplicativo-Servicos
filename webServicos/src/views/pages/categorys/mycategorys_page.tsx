import { Tag } from "lucide-react";
import ListPage from "../list_page";
import { Categoria } from "../../../interface";
import { useEffect, useState } from "react";
import { getCategorys } from "../../../services/get";

export default function MyCategorysPage() {
  const [categorys, setCategorys] = useState<Categoria[]>([])

  useEffect(() => {
    const fetchCategorys = async () => {
      try {
        const result = await getCategorys();

        setCategorys(result.getCategorys);

      } catch (error) {
        console.error(error);
      }
    }
    fetchCategorys();
  }, [])

  return (
    <ListPage
      title="Categorias"
      createLink="/createcategory/nova"
      items={categorys}
      icon={<Tag size={24} />}
      renderItem={(categoria) => (
        <div className="card shadow-sm h-100">
          <div className="card-body d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Tag size={20} className="text-warning" />
              <h5 className="card-title m-0">{categoria.CATEGORIA}</h5>
            </div>
          </div>
        </div>
      )}
    />
  );
}
