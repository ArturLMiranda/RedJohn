import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';

const FormularioNomeConfig = ({ onClickSalvar, onClickDelete }) => {
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

            {/* Botões lado a lado */}
            <div className="d-flex gap-2 justify-content-end">
                <Botao texto="Excluir" onClick={onClickDelete} tipo="btn-delete" />
                <Botao texto="Salvar" onClick={onClickSalvar} tipo="btn-salva" />
            </div>
        </div>
    );
};

export default FormularioNomeConfig;