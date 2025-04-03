import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';

const FormularioUsuarioNovo = ({ onClick, onClickDelete }) => {
    return (
        <div className="menu-suspenso p-3">
            {/* Nome */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio" style={{ marginTop: "4%" }}>Nome*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" required placeholder="Digite o nome" style={{ marginTop: "4%" }}/>
                </Col>
                
                <Form.Label column sm={3} className="obrigatorio" style={{ marginTop: "2%" }}>Senha*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="password" required placeholder="Digite a senha" style={{ marginTop: "2%" }} />
                </Col>

                {/* Confirmação de Senha */}
                <Form.Label column sm={3} className="obrigatorio" style={{ marginTop: "2%" }}>Confirma a Senha*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="password" required placeholder="Confirme a senha" style={{ marginTop: "2%" }} />
                </Col>
       
                {/* Dropdown */}
                <Form.Label column sm={3} style={{ marginTop: "2%" }}>Perfil</Form.Label>
                <Col sm={9}>
                    <Form.Select defaultValue="user" style={{ marginTop: "2%" }}>
                        <option value="">Selecione um perfil</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuário</option>
                        <option value="guest">Convidado</option>
                    </Form.Select>
                </Col>
            </Form.Group>

            {/* Botão de envio */}
            <div className="text-end">
                <Botao texto="Salvar" onClick={onClick} tipo="btn-salva" />
            </div>
        </div>
    );
};

export default FormularioUsuarioNovo;
