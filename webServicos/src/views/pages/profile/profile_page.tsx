import { useState, useEffect } from 'react';
import {
  Button, Form, Row, Col, Modal, ProgressBar, Card,
} from 'react-bootstrap';
import { getCEP, getLogin } from '../../../services/get';
import MaskedInput from 'react-maskedinput';
import MessageComponets from '../../../components/modal/message_components';
import { MessageInterface, ProfileData } from '../../../interface';
import { updateProfile } from '../../../services/update';

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    nome: '',
    email: '',
    telefone: '',
    tipo: '',
    data_cadastro: '',
    cep: '',
    estado: '',
    cidade: '',
    cpfcnpj: '',
    sobre: '',
    instagram: '',
    whatsapp: '',
    foto_perfil: null,
    banner_perfil: null,
    status: 'Ativo',
    ultimo_login: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState<MessageInterface>({
    show: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getLogin();
        setProfile((prev) => ({ ...prev, ...result.getLogin[0] }));
      } catch (err) {
        console.error("Erro ao buscar perfil", err);
      }
    };

    fetchProfile();
  }, []);

  const fetchCEP = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/\D/g, '');

    if (name === 'cep' && cleanedValue.length === 8) {
      try {
        const endereco = await getCEP(cleanedValue);
        setProfile((prev) => ({
          ...prev,
          cidade: endereco.getCEP.city || '',
          estado: endereco.getCEP.state || '',
          cep: cleanedValue,
        }));
      } catch (error) {
        setModal({
          show: true,
          message: 'CEP inválido ou não encontrado.',
          type: 'error',
        });
        console.error(error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, [name]: reader.result as string }));
      };
      reader.readAsDataURL(file); 
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.entries(profile).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as Blob | string);
        }
      });

      console.log([...formData.entries()]);
      console.log(formData)

      const response = await updateProfile(formData);
      if (response?.success) {
        setModal({
          show: true,
          message: "Sucesso ao atualizar seu perfil",
          type: "success",
        });
      }
    } catch (err) {
      console.error('Erro ao enviar dados:', err);
      setModal({
        show: true,
        message: "Erro ao fazer atualização",
        type: "error",
      });
    }
  };

  const calcularCompleto = () => {
    const campos = ['nome', 'email', 'telefone', 'cpfcnpj', 'cep', 'estado', 'cidade'];
    const preenchidos = campos.filter(c => profile[c as keyof typeof profile]);
    return Math.floor((preenchidos.length / campos.length) * 100);
  };

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