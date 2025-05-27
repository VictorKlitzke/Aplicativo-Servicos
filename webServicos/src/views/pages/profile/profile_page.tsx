import {
  Button, Form, Row, Col, Modal, ProgressBar, Card,
} from 'react-bootstrap';
import MessageComponets from '../../../components/modal/message_components';
import MaskedInput from 'react-maskedinput';
import { useProfileHooks } from '../../../hooks/profile_hooks';

export default function ProfilePage() {
  const {
    calcularCompleto,
    handleSubmit,
    handleChange,
    editMode, setEditMode,
    showModal, setShowModal,
    modal, setModal,
    fetchCEP,
    profile
  } = useProfileHooks();

  return (
    <div className="container mt-5">
      <h3 className="mb-4 fw-bold text-primary">Meu Perfil</h3>

      <ProgressBar now={calcularCompleto()} label={`${calcularCompleto()}% Completo`} className="mb-4" />

      <Card className="mb-4">
        <Card.Body style={{ marginTop: '60px' }}>
          <Form onSubmit={handleSubmit} encType='enctype="multipart/form-data"'>
            <Row className="g-3">
              <Col md={6}><Form.Group controlId="nome"><Form.Label>Nome</Form.Label><Form.Control type="text" name="nome" value={profile.nome} onChange={handleChange} disabled={!editMode} /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="email"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={profile.email} onChange={handleChange} disabled={!editMode} /></Form.Group></Col>
              {/* <Col md={6}><Form.Group controlId="type"><Form.Label>Tipo</Form.Label><Form.Control type="type" name="type" value={profile.tipo} onChange={handleChange} disabled={!editMode} /></Form.Group></Col> */}
              <Col md={6}><Form.Group controlId="telefone"><Form.Label>Telefone</Form.Label><MaskedInput mask="(11) 11111-1111" type="text" name="telefone" value={profile.telefone} onChange={handleChange} disabled={!editMode} className="form-control" /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="cpfcnpj"><Form.Label>CPF/CNPJ</Form.Label><MaskedInput mask="111.111.111-11" type="text" name="cpfcnpj" value={profile.cpfcnpj} onChange={handleChange} disabled={!editMode} className="form-control" /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="cep"><Form.Label>CEP</Form.Label><Form.Control type="text" name="cep" value={profile.cep} onChange={fetchCEP} disabled={!editMode} /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="estado"><Form.Label>Estado</Form.Label><Form.Control type="text" name="estado" value={profile.estado} disabled /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="cidade"><Form.Label>Cidade</Form.Label><Form.Control type="text" name="cidade" value={profile.cidade} disabled /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="data_cadastro"><Form.Label>Data de Cadastro</Form.Label><Form.Control type="date" name="data_cadastro" value={profile.data_cadastro} disabled /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="foto_perfil"><Form.Label>Avatar</Form.Label><Form.Control type="file" name="foto_perfil" accept="image/*" onChange={handleChange} disabled={!editMode} /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="banner_perfil"><Form.Label>Banner</Form.Label><Form.Control type="file" name="banner_perfil" accept="image/*" onChange={handleChange} disabled={!editMode} /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="status"><Form.Label>status</Form.Label><Form.Control type="text" name="status" value={profile.status} disabled /></Form.Group></Col>
            </Row>

            <hr className="my-4" />
            <h5 className="fw-bold text-secondary">Sobre</h5>
            <Form.Group controlId="sobre"><Form.Label>Sobre mim</Form.Label><Form.Control as="textarea" name="sobre" value={profile.sobre} onChange={handleChange} disabled={!editMode} rows={3} /></Form.Group>

            <Row className="mt-3">
              <Col md={6}><Form.Group controlId="instagram"><Form.Label>Instagram</Form.Label><Form.Control type="text" name="instagram" value={profile.instagram} onChange={handleChange} disabled={!editMode} placeholder="@usuario" /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="whatsapp"><Form.Label>WhatsApp</Form.Label><Form.Control type="text" name="whatsapp" value={profile.whatsapp} onChange={handleChange} disabled={!editMode} placeholder="(00) 00000-0000" /></Form.Group></Col>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              {!editMode ? (
                <Button variant="warning" onClick={() => setEditMode(true)}>Editar Perfil</Button>
              ) : (
                <>
                  <Button variant="secondary" onClick={() => setEditMode(false)}>Cancelar</Button>
                  <Button variant="success" type="submit">Salvar Alterações</Button>
                </>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Button variant="outline-danger" className="mb-4" onClick={() => setShowModal(true)}>Desativar Conta</Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Desativar Conta</Modal.Title></Modal.Header>
        <Modal.Body><p>Tem certeza que deseja desativar sua conta? Esta ação não pode ser desfeita.</p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={() => console.log("Conta desativada")}>Desativar Conta</Button>
        </Modal.Footer>
      </Modal>

      <MessageComponets
        show={modal.show}
        type={modal.type}
        title={modal.type}
        message={modal.message}
        onClose={() => setModal({ ...modal, show: false })}
      />
    </div>
  );
}