import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa';

const CardDemanda = ({ titulo, demandante, responsavel, descricao, cor, onOpenModal }) => {
    return (
        <Card className="card-demanda" style={{ overflow: 'hidden', backgroundColor: '#2F2F31', color: 'white', height: '100%' }}>
            <Row className="g-0" style={{ height: '100%' }}>
                <Col xs={1} style={{ backgroundColor: cor, height: '100%' }}></Col>
                <Col xs={11} className="p-3" style={{ display: 'flex', flexDirection: 'column', height: '100%', margin: "-4%" }}>
                    <Card.Body style={{ flex: 1, position: 'relative' }}>
                        <Row className="align-items-center" style={{ marginTop: '0' }}>
                            <Col xs={11} className="text-center">
                                <Card.Title>{titulo}</Card.Title>
                            </Col>
                            <Col xs={1} className="text-end" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                            <Button 
                                style={{ backgroundColor: '#2F2F31', borderColor: '#2F2F31' }}
                                className="botao-config"
                                onClick={() => {
                                    console.log('🔧 Botão de engrenagem clicado!'); // Teste no console
                                    if (onOpenModal) {
                                        onOpenModal();
                                    } else {
                                        console.log('⚠️ onOpenModal está indefinido!');
                                    }
                                }}
                            >
                                <FaCog style={{ color: '#FA7530' }} />
                            </Button>
                            </Col>
                        </Row>
                        <Row><Col><p><strong>Demandante:</strong> {demandante}</p></Col></Row>
                        <Row><Col><p><strong>Responsável:</strong> {responsavel}</p></Col></Row>
                        <Row><Col><p><strong>Descrição:</strong> {descricao}</p></Col></Row>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default CardDemanda;
