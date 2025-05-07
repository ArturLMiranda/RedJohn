import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import BotaoEngrenagem from './BotaoEngrenagem';

const CardDemanda = ({ titulo, demandante, responsavel, descricao, status, validade, onOpenModal }) => {
    // Usa a cor vinda do backend, ou uma cor padrão caso não esteja presente
    const cor = status?.cor || '#6c757d';

    const formatarData = (data) => {
        const date = new Date(data);

        // NÃO ajustar fuso horário nem alterar a data original
        const dia = String(date.getUTCDate()).padStart(2, '0');
        const mes = String(date.getUTCMonth() + 1).padStart(2, '0');
        const ano = date.getUTCFullYear();

        return `${dia}/${mes}/${ano}`;
    };

    return (
        <Card
            className="card-demanda"
            style={{ overflow: 'hidden', backgroundColor: '#2F2F31', color: 'white', height: '100%' }}
        >
            <Row className="g-0" style={{ height: '100%' }}>
                <Col xs={1} style={{ backgroundColor: cor, height: '100%' }}></Col>
                <Col xs={11} className="p-3" style={{ display: 'flex', flexDirection: 'column', height: '100%', margin: '-4%' }}>
                    <Card.Body style={{ flex: 1, position: 'relative' }}>
                        <Row className="align-items-center">
                            <Col xs={11} className="text-center">
                                <Card.Title>{titulo}</Card.Title>
                            </Col>
                            <Col xs={1} className="text-end" style={{ position: 'absolute', top: '10px', right: '-5px' }}>
                                <BotaoEngrenagem onClick={onOpenModal} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p><strong>Demandante:</strong> {demandante?.nome || 'Não informado'}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p><strong>Responsáveis:</strong> {Array.isArray(responsavel) && responsavel.length > 0 ? responsavel.map(r => r.nome).join(', ') : 'Nenhum responsável'}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p><strong>Descrição:</strong> {descricao || 'Sem descrição'}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p><strong>Status:</strong> {status?.nome || 'Não definido'}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p><strong>Data de Validade:</strong> {validade ? formatarData(validade) : 'Não definida'}</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
};

export default CardDemanda;
