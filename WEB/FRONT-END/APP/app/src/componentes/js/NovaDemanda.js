import React, { useState } from 'react';
import { Form, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';
import criarDemanda from '../utils/home/criarDemanda';

const NovaDemanda = () => {
    const [status, setStatus] = useState('Aguardando');
    const [nome, setNome] = useState('');
    const [demandante, setDemandante] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [descricao, setDescricao] = useState('');
    const [validade, setValidade] = useState('');

    const handleSalvar = async () => {
        const novaDemanda = {
            descricao: nome,
            demandante,
            responsaveis: [responsavel],
            validade,
            status,
        };

        const sucesso = await criarDemanda(novaDemanda);
        if (sucesso) {
            window.location.reload(); // recarrega a página
        }
    };

    return (
        <div className="menu-suspenso p-3">
            {/* Nome */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio">Nome*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" required placeholder="Digite o nome"
                        value={nome} onChange={(e) => setNome(e.target.value)} />
                </Col>
            </Form.Group>

            {/* Status */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Status:</Form.Label>
                <Col sm={9}>
                    <ToggleButtonGroup type="radio" name="status" value={status} onChange={setStatus}>
                        <ToggleButton id="aguardando" value="Aguardando" variant={status === 'Aguardando' ? 'primary' : 'dark'}>Aguardando</ToggleButton>
                        <ToggleButton id="andamento" value="Em andamento" variant={status === 'Em andamento' ? 'warning' : 'dark'}>Em andamento</ToggleButton>
                        <ToggleButton id="resolvido" value="Resolvido" variant={status === 'Resolvido' ? 'success' : 'dark'}>Resolvido</ToggleButton>
                        <ToggleButton id="erro" value="Erro" variant={status === 'Erro' ? 'danger' : 'dark'}>Erro</ToggleButton>
                    </ToggleButtonGroup>
                </Col>
            </Form.Group>

            {/* Demandante */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio">Demandante*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" required placeholder="Digite o demandante"
                        value={demandante} onChange={(e) => setDemandante(e.target.value)} />
                </Col>
            </Form.Group>

            {/* Responsável */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio">Responsável*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" required placeholder="Digite o responsável"
                        value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />
                </Col>
            </Form.Group>

            {/* Descrição */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Descrição:</Form.Label>
                <Col sm={9}>
                    <Form.Control as="textarea" rows={3} placeholder="Digite a descrição"
                        value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                </Col>
            </Form.Group>

            {/* Data de vencimento */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Data de vencimento:</Form.Label>
                <Col sm={9}>
                    <Form.Control type="date" required
                        value={validade} onChange={(e) => setValidade(e.target.value)} />
                </Col>
            </Form.Group>

            {/* Botão de envio */}
            <div className="text-end">
                <Botao texto="Salvar" onClick={handleSalvar} tipo="btn-salva" />
            </div>
        </div>
    );
};

export default NovaDemanda;
