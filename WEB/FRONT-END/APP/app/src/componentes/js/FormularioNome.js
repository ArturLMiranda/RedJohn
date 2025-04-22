import React, { useState } from 'react';
import { Form, Button, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';
const FormularioNomeConfig = ({ responsavel, onClickSalvar, onClickDelete }) => {
    const [nome, setNome] = useState(responsavel?.nome || '');

    useEffect(() => {
        setNome(responsavel?.nome || '');
    }, [responsavel]);

    return (
        <div className="menu-suspenso p-3">
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio">Nome*</Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="text"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite o nome"
                    />
                </Col>
            </Form.Group>

            <div className="d-flex gap-2 justify-content-end">
                <Botao texto="Excluir" onClick={onClickDelete} tipo="btn-delete" />
                <Botao texto="Salvar" onClick={() => onClickSalvar(nome)} tipo="btn-salva" />
            </div>
        </div>
    );
};

export default FomurarioNome;
