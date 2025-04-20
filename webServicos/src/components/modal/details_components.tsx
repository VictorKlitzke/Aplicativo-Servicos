import { Modal } from "react-bootstrap";
import { DetailsInteface } from "../../interface";

export default function ModalComponents({
  show,
  title,
  children,
  onClose,
  footer,
  size = "lg",
  centered = true,
}: DetailsInteface) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      size={size}
      centered={centered}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-semibold text-primary">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {children}
      </Modal.Body>
      {footer && (
        <Modal.Footer className="bg-light d-flex justify-content-end gap-2">
          {footer}
        </Modal.Footer>
      )}
    </Modal>
  );
}
