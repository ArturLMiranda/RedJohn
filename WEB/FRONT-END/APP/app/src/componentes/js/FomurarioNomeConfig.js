import React, { useState } from 'react';
import { Form, Button, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';
const FomurarioNomeConfig = () => {
    const [status, setStatus] = useState('Aguardando');

    return (
        <div className="menu-suspenso p-3">
            {/* Nome */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio">Nome*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" required placeholder="Digite o nome" />
                </Col>
            </Form.Group>
            {/* Botão de envio */}
            <div className="text-end">
            <Botao texto="Salvar" onClick={null} tipo="btn-salva" />
            </div>
            <div className="text-end">
            <Botao texto="Salvar" onClick={null} tipo="btn-delete" />
            </div>
        </div>
    );
};

export default FomurarioNomeConfig;
