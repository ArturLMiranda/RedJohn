import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa'; // Ícone de engrenagem

const CardDemanda = ({ titulo, demandante, responsavel, descricao, cor,Modal }) => {
    return (
        <Card className="card-demanda" style={{ overflow: 'hidden', backgroundColor: '#2F2F31', color: 'white', height: '100%' }}>
            <Row className="g-0" style={{ height: '100%' }}> {/* Remove espaçamentos extras e ajusta a altura */}
                {/* Barra lateral colorida à esquerda */}
                <Col xs={1} style={{ backgroundColor: cor, height: '100%'}}></Col>

                {/* Conteúdo do card */}
                <Col xs={11} className="p-3" style={{ display: 'flex', flexDirection: 'column', height: '100%',margin:"-4%" }}>
                    <Card.Body style={{ flex: 1, position: 'relative' }}>
                        {/* Título e ícone de engrenagem */}
                        <Row className="align-items-center" style={{ marginTop: '0' }}>
                            <Col xs={11} className="text-center">
                                <Card.Title>{titulo}</Card.Title>
                            </Col>
                            <Col xs={1} className="text-end" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <Button style={{ backgroundColor: '#2F2F31', borderColor: '#2F2F31' }} className="botao-config">
                                    <FaCog style={{ color: '#FA7530' }} />  {/* Altere a cor aqui */}                               
                                </Button>
                            </Col>
                        </Row>

                        {/* Informações da demanda */}
                        <Row>
                            <Col xs={12}>
                                <p><strong>Demandante:</strong> {demandante}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <p><strong>Responsável:</strong> {responsavel}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <p><strong>Descrição:</strong> {descricao}</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default CardDemanda;
