import { useState } from "react";

export function useConfigHooks() {
    const [saved, setSaved] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setShowDeleteConfirm(false);
        alert("Conta excluída");
    };

    return {
        confirmDelete,
        handleDelete,
        handleSubmit,
        saved,
        showDeleteConfirm,
        setShowDeleteConfirm
    }
}