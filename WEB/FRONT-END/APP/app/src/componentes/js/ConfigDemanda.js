import React, { useState } from 'react';
import { Form, Button, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';
const ConfigDemanda = () => {
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
                    <Form.Control type="text" required placeholder="Digite o demandante" />
                </Col>
            </Form.Group>

            {/* Responsável */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio">Responsável*</Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" required placeholder="Digite o responsável" />
                </Col>
            </Form.Group>

            {/* Descrição */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Descrição:</Form.Label>
                <Col sm={9}>
                    <Form.Control as="textarea" rows={3} placeholder="Digite a descrição" />
                </Col>
            </Form.Group>

            {/* Data de vencimento */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Data de vencimento:</Form.Label>
                <Col sm={9}>
                    <Form.Control type="date" required />
                </Col>
            </Form.Group>

            {/* Botão de envio */}
            <div className="text-end">
            <Botao texto="Deletar" onClick={null} tipo="btn-delete" />
            <Botao texto="Salvar" onClick={null} tipo="btn-salva" />
            </div>
        </div>
    );
};

export default ConfigDemanda;
