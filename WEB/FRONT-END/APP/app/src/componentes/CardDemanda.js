import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa'; // Ícone de engrenagem

const CardDemanda = ({ titulo, demandante, responsavel, descricao, cor }) => {
    return (
        <Card className="card-demanda">
            <Row noGutters>
                {/* Barra lateral colorida à esquerda, recebendo a cor via props */}
                <Col xs={2} style={{ backgroundColor: cor }}></Col>

                <Col xs={10} className="p-3">
                    <Card.Body>
                        {/* Título e ícone de engrenagem */}
                        <Row className="align-items-center">
                            <Col xs={10} className="text-center">
                                <Card.Title>{titulo}</Card.Title>
                            </Col>
                            <Col xs={2} className="text-end">
                                {/* Botão com ícone de engrenagem */}
                                <Button variant="dark" className="botao-config">
                                    <FaCog />
                                </Button>
                            </Col>
                        </Row>

                        {/* Informações da demanda */}
                        <Row>
                            <Col xs={12}>
                                <p><strong>Demandante:</strong> {demandante}</p>
                            </Col>
                        </Row>

                        {/* Responsável abaixo do Demandante */}
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
