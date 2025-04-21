import { Button, Navbar, Nav, Container, Carousel, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaUserCheck, FaHandshake, FaShieldAlt, FaBolt, FaStar } from 'react-icons/fa';
import colors from "../../style/colors";

export default function LandingPage() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar expand="lg" style={{ backgroundColor: colors.dark, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <Container>
                    <Navbar.Brand href="#" style={{ color: colors.light, fontWeight: "bold", fontSize: "1.75rem" }}>
                        EasyWork
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link
                                onClick={() => navigate("/login")}
                                style={{
                                    color: colors.light,
                                    fontWeight: "500",
                                    padding: "8px 20px",
                                    borderRadius: "25px",
                                    transition: "background-color 0.3s, color 0.3s",
                                }}
                                className="nav-link-hover"
                            >
                                Login
                            </Nav.Link>
                            <Nav.Link
                                href="#cadastro"
                                style={{
                                    color: colors.light,
                                    fontWeight: "500",
                                    padding: "8px 20px",
                                    borderRadius: "25px",
                                    transition: "background-color 0.3s, color 0.3s",
                                    backgroundColor: colors.primary,
                                }}
                                className="nav-link-hover"
                            >
                                Cadastrar-se
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <section
                className="text-center d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/public/images/landingpage.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    color: colors.white,
                }}
            >
                <Container>
                    <div className="px-4 py-5">
                        <h1 className="display-2 fw-bold mb-4" style={{ color: colors.light }}>
                            Conecte-se com os melhores talentos
                        </h1>
                        <p className="lead fs-4 mb-4">Dê vida às suas ideias com profissionais prontos para fazer acontecer.</p>
                        <Button variant="light" size="lg" className="px-5 py-3 text-dark fw-semibold shadow-lg">
                            Comece Agora
                        </Button>
                    </div>
                </Container>
            </section>

            {/* Como Funciona Section */}
            <section className="py-5" style={{ backgroundColor: colors.dark }}>
                <Container>
                    <h2 className="text-center mb-5 fw-bold" style={{ color: colors.light, fontSize: "2.5rem" }}>
                        Como Funciona
                    </h2>
                    <Carousel indicators={true} controls={true} interval={5000} fade>
                        {[{
                            icon: <FaClipboardList size={50} color={colors.secondary} />,
                            title: "1. Publique seu projeto",
                            description: "Descreva o que você precisa e receba propostas de profissionais prontos para ajudar."
                        }, {
                            icon: <FaUserCheck size={50} color={colors.secondary} />,
                            title: "2. Escolha o profissional",
                            description: "Compare avaliações, portfólios e negocie diretamente com os melhores especialistas."
                        }, {
                            icon: <FaHandshake size={50} color={colors.secondary} />,
                            title: "3. Receba com qualidade",
                            description: "Só pague após a entrega do serviço, garantindo segurança e satisfação total."
                        }].map((step, index) => (
                            <Carousel.Item key={index}>
                                <div className="d-flex flex-column align-items-center justify-content-center p-5 border-0 rounded-3 shadow-lg bg-gradient text-white text-center"
                                    style={{
                                        background: `linear-gradient(145deg, ${colors.primary}, ${colors.secondary})`,
                                        boxShadow: "0 10px 30px rgba(154, 154, 154, 0.1)",
                                        transition: "all 0.3s ease"
                                    }}
                                >
                                    <div className="mb-4" style={{ transform: "scale(1.1)", transition: "transform 0.3s ease" }}>
                                        {step.icon}
                                    </div>
                                    <h4 className="fw-bold" style={{ fontSize: "1.5rem" }}>
                                        {step.title}
                                    </h4>
                                    <p className="w-75 mx-auto" style={{ fontSize: "1rem" }}>
                                        {step.description}
                                    </p>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Container>
            </section>

            {/* Características Section */}
            <section className="py-5" style={{ backgroundColor: colors.dark }}>
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold" style={{ color: colors.light }}>Comece agora mesmo!</h2>
                        <p className="lead" style={{ color: colors.light }}>
                            Publique seu projeto e receba propostas em minutos. A nossa plataforma oferece muito mais.
                        </p>
                    </div>

                    <Row className="text-center mb-5">
                        {[{
                            icon: <FaBolt size={50} color={colors.secondary} />,
                            title: "Rapidez na Resposta",
                            description: "Receba propostas em minutos após publicar seu projeto. Agilidade é nosso lema."
                        }, {
                            icon: <FaShieldAlt size={50} color={colors.secondary} />,
                            title: "Segurança Garantida",
                            description: "Pagamento só é liberado após sua aprovação. Segurança para você e o profissional."
                        }, {
                            icon: <FaStar size={50} color={colors.secondary} />,
                            title: "Qualidade Profissional",
                            description: "Trabalhe com especialistas avaliados, com histórico e portfólio comprovados."
                        }].map((feature, index) => (
                            <Col md={4} className="mb-4" key={index}>
                                <div className="p-4 border rounded shadow bg-white h-100"
                                    style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", transition: "transform 0.3s ease" }}>
                                    {feature.icon}
                                    <h5 className="fw-bold" style={{ color: colors.primary }}>{feature.title}</h5>
                                    <p>{feature.description}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Footer */}
            <footer className="py-4" style={{ backgroundColor: colors.dark, color: colors.white }}>
                <Container className="text-center">
                    <p>&copy; {new Date().getFullYear()} EasyWork. Todos os direitos reservados.</p>
                </Container>
            </footer>
        </>
    );
}
