import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa';
import BotaoEngrenagem from './BotaoEngrenagem';
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
                            <Col xs={1} className="text-end" style={{ position: 'absolute', top: '10px', right: '-5px' }}>
                                <BotaoEngrenagem onClick={onOpenModal}/>
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
