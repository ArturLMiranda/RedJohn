import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';

const FormularioNome = ({ entidade, onClickSalvar, onClickDelete }) => {
    const [nome, setNome] = useState(entidade?.nome || '');

    useEffect(() => {
        setNome(entidade?.nome || '');
    }, [entidade]);

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
                <Botao
                    texto="Salvar"
                    onClick={() => {
                        const nomeValido = nome.trim();
                        if (nomeValido === '') {
                            alert('O nome não pode estar vazio.');
                            return;
                        }
                        onClickSalvar(nomeValido);
                    }}
                    tipo="btn-salva"
                    disabled={nome.trim() === ''}
                />
            </div>
        </div>
    );
};

export default FormularioNome;
