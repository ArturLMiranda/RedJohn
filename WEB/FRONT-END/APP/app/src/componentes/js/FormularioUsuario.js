import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';

const FormularioUsuario = ({ onClick,onClickDelete }) => {
    return (
        <div className="menu-suspenso p-3">
            {/* Nome */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio">Nome*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" required placeholder="Digite o nome" />
                </Col>
                <Form.Label column sm={3} className="obrigatorio" style={{marginTop:"4%"}}>Senha* </Form.Label>
                <Col sm={9}>
                    <Form.Control type="password" required placeholder="Digite a senha" style={{marginTop:"4%"}} />
                </Col>
            </Form.Group>
            {/* Botão de envio */}
            <div className="text-end">
                <Botao texto="Salvar" onClick={onClick} tipo="btn-salva" />
                <Botao texto="Excluir" onClick={onClickDelete} tipo="btn-delete" />
            </div>
        </div>
    );
};

export default FormularioUsuario;
