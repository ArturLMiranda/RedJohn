import React, { useState, useEffect } from 'react';
import { Form, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';
import criarDemanda from '../utils/home/criarDemanda';
import { API_URL } from '../utils/config';
const fetchDemandantes = async () => {
    const response = await fetch(`${API_URL}/api/demandantes/`);
    const data = await response.json();
    return data;
};

const fetchResponsaveis = async () => {
    const response = await fetch(`${API_URL}/api/responsaveis/`);
    const data = await response.json();
    return data;
};

const fetchStatus = async () => {
    const response = await fetch(`${API_URL}/api/status/`);
    const data = await response.json();
    return data;
};

const NovaDemanda = () => {
    const [status, setStatus] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [demandante, setDemandante] = useState('');
    const [responsaveis, setResponsaveis] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [validade, setValidade] = useState('');
    const [demandantes, setDemandantes] = useState([]);
    const [todosResponsaveis, setTodosResponsaveis] = useState([]);
    const [statuses, setStatuses] = useState([]);
    console.log('Payload:', NovaDemanda);

    useEffect(() => {
        const fetchData = async () => {
            console.log('Payload:', NovaDemanda);
            const demandantesData = await fetchDemandantes();
            const responsaveisData = await fetchResponsaveis();
            const statusesData = await fetchStatus();
            setDemandantes(demandantesData);
            setTodosResponsaveis(responsaveisData);
            setStatuses(statusesData);
        };

        fetchData();
    }, []);

    const handleResponsavelChange = (e) => {
        const selectedResponsaveis = Array.from(e.target.selectedOptions, option => option.value);
        setResponsaveis(selectedResponsaveis);
    };

    const handleSalvar = async () => {
        const novaDemanda = {
            titulo,
            descricao,
            demandante,
            responsaveis,
            validade,
            status,
        };

        const sucesso = await criarDemanda(novaDemanda);
        if (sucesso) {
            window.location.reload();
        }
    };

    return (
        <div className="menu-suspenso p-3">
            {/* Título */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio">Título*</Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="text"
                        required
                        placeholder="Digite o título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </Col>
            </Form.Group>

            {/* Status */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Status:</Form.Label>
                <Col sm={9}>
                    <ToggleButtonGroup
                        type="radio"
                        name="status"
                        value={status}
                        onChange={(val) => setStatus(val)}
                    >
                        {statuses.length > 0 ? (
                            statuses.map((item) => (
                                <ToggleButton
                                    key={item.id}
                                    id={`status-${item.id}`}
                                    value={item.id}
                                    style={{
                                        backgroundColor: status === item.id ? item.cor : '#6c757d',
                                        color: 'white',
                                    }}
                                >
                                    {item.nome}
                                </ToggleButton>
                            ))
                        ) : (
                            <div>Carregando status...</div>
                        )}
                    </ToggleButtonGroup>
                </Col>
            </Form.Group>

            {/* Demandante */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio">Demandante*</Form.Label>
                <Col sm={9}>
                    <Form.Control
                        as="select"
                        required
                        value={demandante}
                        onChange={(e) => setDemandante(e.target.value)}
                    >
                        <option value="">Selecione um demandante</option>
                        {demandantes.map((item) => (
                            <option key={item.id} value={item.id}>{item.nome}</option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>

            {/* Responsáveis */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio">Responsáveis*</Form.Label>
                <Col sm={9}>
                    <Form.Control
                        as="select"
                        multiple
                        required
                        value={responsaveis}
                        onChange={handleResponsavelChange}
                    >
                        {todosResponsaveis.map((item) => (
                            <option key={item.id} value={item.id}>{item.nome}</option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>

            {/* Descrição */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Descrição:</Form.Label>
                <Col sm={9}>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Digite a descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </Col>
            </Form.Group>

            {/* Data de vencimento */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Data de vencimento:</Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="date"
                        required
                        value={validade}
                        onChange={(e) => setValidade(e.target.value)}
                    />
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
