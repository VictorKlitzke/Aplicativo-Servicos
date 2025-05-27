import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ListPageProps } from "../../../interface";

export default function ListPage<T>({
  title,
  createLink,
  items,
  renderItem,
  icon,
  onNovo,
}: ListPageProps<T>) {
  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="m-0">
          {icon} {title}
        </h3>
        {createLink && (
          <Link
            onClick={onNovo}
            to={createLink}
            className="btn btn-success d-flex align-items-center gap-2"
          >
            <PlusCircle size={18} /> Novo
          </Link>
        )}
      </div>

      <div className="row g-3">
        {items.map((item, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="h-100" style={{ minHeight: "300px" }}>
              {renderItem(item)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
