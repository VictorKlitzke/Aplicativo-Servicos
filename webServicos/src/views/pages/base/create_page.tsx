import React from "react";

type CreatePage = {
  title: string;
  fields: {
    label: string;
    name: string;
    type: "text" | "number" | "textarea" | "select";
    value: string;
    options?: { label: string; value: string }[];
    readonly?: boolean; 
    disabled?: boolean; 
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  }[];
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
};

export default function CreatePage({ title, fields, onSubmit, submitLabel = "Salvar" }: CreatePage) {
  return (
    <div className="container-fluid p-4">
      <h3 className="mb-4">{title}</h3>
      <form onSubmit={onSubmit} className="row g-3">
        {fields.map((field, index) => {
          const baseClass = `form-control ${field.readonly ? "bg-light text-muted" : ""}`;
          return (
            <div className="col-md-6" key={index}>
              <label className="form-label">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  className={baseClass}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  rows={5}
                  readOnly={field.readonly}
                ></textarea>
              ) : field.type === "select" ? (
                <select
                  className={`form-select ${field.readonly ? "bg-light text-muted" : ""}`}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={field.readonly || field.disabled}
                >
                  {field.options?.map((opt, i) => (
                    <option key={i} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  className={baseClass}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  readOnly={field.readonly}
                />
              )}
            </div>
          );
        })}

        <div className="col-12 d-flex justify-content-end">
          <button type="submit" className="btn btn-success px-4">{submitLabel}</button>
        </div>
      </form>
    </div>
  );
}
