import React from "react";
import { MessageInterface, ModalType } from "../../interface";

interface Props extends MessageInterface {
    onClose: () => void;
}

const getColor = (type: string | undefined) => {
    switch (type) {
        case "success":
            return "#22c55e";
        case "error":
            return "#ef4444";
        case "warning":
            return "#f59e0b";
        case "info":
        default:
            return "#3b82f6";
    }
};

const getTitle = (type: ModalType) => {
    switch (type) {
        case "error": return "Erro";
        case "warning": return "Aviso";
        case "info": return "Informação";
        case "success": return "Sucesso";
        default: return "Mensagem";
    }
};

const MessageComponets: React.FC<Props> = ({
    show,
    type = "info",
    message,
    onClose,
}) => {
    if (!show) return null;

    const color = getColor(type);

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div
                style={styles.modal}
                onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar no modal
            >
                <h2 style={{ ...styles.title, color }}>{getTitle(type)}</h2>
                <p style={styles.message}>{message}</p>
                <button
                    style={{ ...styles.button, backgroundColor: color }}
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999
    },
    modal: {
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)"
    },
    title: {
        fontSize: "1.5rem",
        marginBottom: "1rem"
    },
    message: {
        fontSize: "1rem",
        marginBottom: "1.5rem"
    },
    button: {
        padding: "0.5rem 1.2rem",
        border: "none",
        borderRadius: "4px",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer"
    }
};

export default MessageComponets;
