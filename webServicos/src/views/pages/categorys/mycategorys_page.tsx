import { Tag } from "lucide-react";
import ListPage from "../base/list_page";
import { useMycategorysHooks } from "../../../hooks/mycategory_hooks";

export default function MyCategorysPage() {
 const {
  categorys
 } = useMycategorysHooks();

  return (
    <ListPage
      title="Categorias"
      createLink="/createcategory/new"
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
