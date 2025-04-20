import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { getLogin } from '../../../services/get';

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
        foto_perfil: null,
    });

    const [editMode, setEditMode] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const result = await getLogin(); 
                setProfile(result.getLogin);
                if (result.foto_perfil) {
                    setPreview(`${apiUrl}uploads/${result.foto_perfil}`); 
                }
            } catch (err) {
                console.error("Erro ao buscar perfil", err);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = () => {

      
    };

    const handleSubmit = async () => {

        // try {
        //     const formData = new FormData();

        //     const response = await fetch(`${apiUrl}updateProfile`, {
        //         method: 'POST',
        //         body: formData,
        //     });

        //     if (!response.ok) {
        //         throw new Error('Erro ao salvar perfil');
        //     }

        //     const result = await response.json();
        //     console.log('Perfil salvo com sucesso:', result);
        //     setEditMode(false);
        // } catch (err) {
        //     console.error('Erro ao enviar dados:', err);
        // }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4 fw-bold text-primary">Meu Perfil</h3>
            <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                    <Col md={6}>
                        <Form.Group controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={profile.nome}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="telefone">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control
                                type="tel"
                                name="telefone"
                                value={profile.telefone}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="tipo">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select
                                name="tipo"
                                value={profile.tipo}
                                onChange={handleChange}
                                disabled={!editMode}
                            >
                                <option value="cliente">Cliente</option>
                                <option value="profissional">Profissional</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="cpfcnpj">
                            <Form.Label>CPF/CNPJ</Form.Label>
                            <Form.Control
                                type="text"
                                name="cpfcnpj"
                                value={profile.cpfcnpj}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="cep">
                            <Form.Label>CEP</Form.Label>
                            <Form.Control
                                type="text"
                                name="cep"
                                value={profile.cep}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="estado">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type="text"
                                name="estado"
                                value={profile.estado}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="cidade">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                name="cidade"
                                value={profile.cidade}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="data_cadastro">
                            <Form.Label>Data de Cadastro</Form.Label>
                            <Form.Control
                                type="date"
                                name="data_cadastro"
                                value={profile.data_cadastro}
                                disabled
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="foto_perfil">
                            <Form.Label>Foto de Perfil</Form.Label>
                            <Form.Control
                                type="file"
                                name="foto_perfil"
                                accept="image/*"
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </Form.Group>
                        {preview && (
                            <div className="mt-2">
                                <img src={preview} alt="Preview" height="80" />
                            </div>
                        )}
                    </Col>
                </Row>

                <div className="d-flex justify-content-between mt-4">
                    {!editMode ? (
                        <Button variant="warning" onClick={() => setEditMode(true)}>
                            Editar Perfil
                        </Button>
                    ) : (
                        <>
                            <Button variant="secondary" onClick={() => setEditMode(false)}>
                                Cancelar
                            </Button>
                            <Button variant="success" type="submit">
                                Salvar Alterações
                            </Button>
                        </>
                    )}
                </div>
            </Form>
        </div>
    );
}
