import React from 'react';
import { Card } from 'react-bootstrap';

const CardDemanda = ({ titulo, demandante, responsavel, descricao }) => {
    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title>{titulo}</Card.Title>
                <Card.Text>
                    <strong>Demandante:</strong> {demandante}
                    <br />
                    <strong>Responsável:</strong> {responsavel}
                    <br />
                    <strong>Descrição:</strong> {descricao}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CardDemanda;
