import { useState, useEffect } from 'react';
import {
  Button, Form, Row, Col, Modal, Toast, ToastContainer, ProgressBar, Card,
} from 'react-bootstrap';
import { getLogin } from '../../../services/get';
import MaskedInput from 'react-maskedinput';

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProfilePage() {
  const [profile, setProfile] = useState({
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
    ultimo_login: '2025-04-20 14:32',
  });

  const [editMode, setEditMode] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getLogin();
        setProfile(prev => ({ ...prev, ...result.getLogin[0] }));

        if (result.getLogin[0]?.foto_perfil) {
          setPreviewAvatar(`${apiUrl}uploads/${result.getLogin[0].foto_perfil}`);
        }
        if (result.getLogin[0]?.banner_perfil) {
          setPreviewBanner(`${apiUrl}uploads/${result.getLogin[0].banner_perfil}`);
        }
      } catch (err) {
        console.error("Erro ao buscar perfil", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'foto_perfil' | 'banner_perfil') => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile(prev => ({ ...prev, [field]: file }));
    //   const url = URL.createObjectURL(file);
    //   field === 'foto_perfil' ? setPreviewAvatar(url) : setPreviewBanner(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await fetch(`${apiUrl}updateProfile`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erro ao salvar perfil');

      setToastMessage('Perfil atualizado com sucesso!');
      setShowToast(true);
      setEditMode(false);
    } catch (err) {
      console.error('Erro ao enviar dados:', err);
      setToastMessage('Erro ao salvar perfil.');
      setShowToast(true);
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
        <div className="position-relative">
          {previewBanner && (
            <img
              src={previewBanner}
              alt="Banner"
              className="w-100"
              style={{ height: '180px', objectFit: 'cover', borderTopLeftRadius: '0.375rem', borderTopRightRadius: '0.375rem' }}
            />
          )}
          {previewAvatar && (
            <img
              src={previewAvatar}
              alt="Avatar"
              className="rounded-circle border border-3 border-white position-absolute"
              style={{ width: '100px', height: '100px', objectFit: 'cover', top: '130px', left: '30px' }}
            />
          )}
        </div>

        <Card.Body style={{ marginTop: '60px' }}>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}><Form.Group controlId="nome"><Form.Label>Nome</Form.Label><Form.Control type="text" name="nome" value={profile.nome} onChange={handleChange} disabled={!editMode} /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="email"><Form.Label>Email</Form.Label><Form.Control type="email" name="email" value={profile.email} onChange={handleChange} disabled={!editMode} /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="telefone"><Form.Label>Telefone</Form.Label><MaskedInput mask="(11) 11111-1111" type="text" name="telefone" value={profile.telefone} onChange={handleChange} disabled={!editMode} className="form-control" /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="cpfcnpj"><Form.Label>CPF/CNPJ</Form.Label><MaskedInput mask="111.111.111-11" type="text" name="cpfcnpj" value={profile.cpfcnpj} onChange={handleChange} disabled={!editMode} className="form-control" /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="cep"><Form.Label>CEP</Form.Label><Form.Control type="text" name="cep" value={profile.cep} onChange={handleChange} disabled={!editMode} /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="estado"><Form.Label>Estado</Form.Label><Form.Control type="text" name="estado" value={profile.estado} onChange={handleChange} disabled={!editMode} /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="cidade"><Form.Label>Cidade</Form.Label><Form.Control type="text" name="cidade" value={profile.cidade} onChange={handleChange} disabled={!editMode} /></Form.Group></Col>
              <Col md={6}><Form.Group controlId="data_cadastro"><Form.Label>Data de Cadastro</Form.Label><Form.Control type="date" name="data_cadastro" value={profile.data_cadastro} disabled /></Form.Group></Col>

              <Col md={6}>
                <Form.Group controlId="foto_perfil">
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control type="file" accept="image/*" disabled={!editMode} onChange={(e) => handleFileChange(e, 'foto_perfil')} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="banner_perfil">
                  <Form.Label>Banner</Form.Label>
                  <Form.Control type="file" accept="image/*" disabled={!editMode} onChange={(e) => handleFileChange(e, 'banner_perfil')} />
                </Form.Group>
              </Col>
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

      {/* Modal de desativação */}
      <Button variant="outline-danger" className="mb-4" onClick={() => setShowModal(true)}>Desativar Conta</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Desativar Conta</Modal.Title></Modal.Header>
        <Modal.Body><p>Tem certeza que deseja desativar sua conta? Esta ação não pode ser desfeita.</p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={() => console.log("Conta desativada")}>Desativar Conta</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast de feedback */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
