import React, { useState, useEffect } from 'react';
import { Form, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';
import { DeletarAtividade } from '../utils/home/DeletarAtividade';
import { EditarAtividade } from '../utils/home/EditarAtividade';

const fetchDemandantes = async () => {
    const response = await fetch('http://localhost:8000/api/demandantes/');
    return await response.json();
};

const fetchResponsaveis = async () => {
    const response = await fetch('http://localhost:8000/api/responsaveis/');
    return await response.json();
};

const fetchStatus = async () => {
    const response = await fetch('http://localhost:8000/api/status/');
    return await response.json();
};

const ConfigDemanda = ({ demanda, onAtualizarAtividades, onFechar }) => {
    const [titulo, setTitulo] = useState('');
    const [status, setStatus] = useState('');
    const [demandante, setDemandante] = useState('');
    const [responsaveis, setResponsaveis] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [validade, setValidade] = useState('');
    const [demandantes, setDemandantes] = useState([]);
    const [todosResponsaveis, setTodosResponsaveis] = useState([]);
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        const carregarDados = async () => {
            setDemandantes(await fetchDemandantes());
            setTodosResponsaveis(await fetchResponsaveis());
            setStatuses(await fetchStatus());
        };
        carregarDados();
    }, []);

    useEffect(() => {
        if (demanda) {
            setTitulo(demanda.titulo || '');
            setStatus(demanda.status || '');
            setDemandante(demanda.demandante || '');
            setResponsaveis(demanda.responsaveis || []);
            setDescricao(demanda.descricao || '');
            setValidade(demanda.validade ? demanda.validade.substring(0, 10) : '');
        }
    }, [demanda]);

    const handleResponsavelChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setResponsaveis(selected);
    };

    const handleDelete = async () => {
        if (demanda && demanda.id) {
            await DeletarAtividade(demanda.id);
            onAtualizarAtividades();
            onFechar();
        }
    };

    const handleEdit = async () => {
        if (demanda && demanda.id) {
            await EditarAtividade(demanda.id, titulo, descricao, demandante, responsaveis, validade, status);
            onAtualizarAtividades();
            onFechar();
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
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Digite o título"
                    />
                </Col>
            </Form.Group>

            {/* Status */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Status:</Form.Label>
                <Col sm={9}>
                    <ToggleButtonGroup type="radio" name="status" value={status} onChange={setStatus}>
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
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Digite a descrição"
                    />
                </Col>
            </Form.Group>

            {/* Validade */}
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

            {/* Botões */}
            <div className="text-end">
                <Botao texto="Deletar" onClick={handleDelete} tipo="btn-delete" />
                <Botao texto="Salvar" onClick={handleEdit} tipo="btn-salva" />
            </div>
        </div>
    );
};

export default ConfigDemanda;
