import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';
import { CadastrarUsuario } from './utils/CadastrarUsuario';

const FormularioUsuarioNovo = ({ onClick, onClickDelete }) => {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [perfil, setPerfil] = useState('');

    const handleSalvar = () => {
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        const novoUsuario = { nome, senha, perfil };
        CadastrarUsuario(novoUsuario, () => {
            setNome('');
            setSenha('');
            setConfirmarSenha('');
            setPerfil('');
        });
    };

    return (
        <div className="menu-suspenso p-3">
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio" style={{ marginTop: "4%" }}>Nome*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required placeholder="Digite o nome" style={{ marginTop: "4%" }}/>
                </Col>

                <Form.Label column sm={3} className="obrigatorio" style={{ marginTop: "2%" }}>Senha*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required placeholder="Digite a senha" style={{ marginTop: "2%" }} />
                </Col>

                <Form.Label column sm={3} className="obrigatorio" style={{ marginTop: "2%" }}>Confirma a Senha*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required placeholder="Confirme a senha" style={{ marginTop: "2%" }} />
                </Col>

                <Form.Label column sm={3} style={{ marginTop: "2%" }}>Perfil</Form.Label>
                <Col sm={9}>
                    <Form.Select value={perfil} onChange={(e) => setPerfil(e.target.value)} style={{ marginTop: "2%" }}>
                        <option value="">Selecione um perfil</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuário</option>
                        <option value="guest">Convidado</option>
                    </Form.Select>
                </Col>
            </Form.Group>

            <div className="text-end">
                <Botao texto="Salvar" onClick={handleSalvar} tipo="btn-salva" />
            </div>
        </div>
    );
};

export default FormularioUsuarioNovo;
