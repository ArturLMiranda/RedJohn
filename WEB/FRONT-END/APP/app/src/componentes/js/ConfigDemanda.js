import React, { useState } from 'react';
import { Form, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../css/NovaDemanda.css';
import Botao from './Botao';
import { DeletarAtividade } from '../utils/home/DeletarAtividade';  // Caminho correto para o arquivo
import { EditarAtividade } from '../utils/home/EditarAtividade';    // Novo import para edição

const ConfigDemanda = () => {
    const [atividadeId, setAtividadeId] = useState(null); // ID da atividade
    const [status, setStatus] = useState('Aguardando');
    const [nome, setNome] = useState('');
    const [demandante, setDemandante] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');

    const handleDelete = () => {
        DeletarAtividade(atividadeId, setAtividadeId);
    };

    const handleEdit = () => {
        EditarAtividade(atividadeId, nome, status, demandante, responsavel, descricao, dataVencimento);
    };

    return (
        <div className="menu-suspenso p-3">
            {/* Nome */}
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
                    <Form.Control
                        type="text"
                        required
                        value={demandante}
                        onChange={(e) => setDemandante(e.target.value)}
                        placeholder="Digite o demandante"
                    />
                </Col>
            </Form.Group>

            {/* Responsável */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3} className="obrigatorio">Responsável*</Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="text"
                        required
                        value={responsavel}
                        onChange={(e) => setResponsavel(e.target.value)}
                        placeholder="Digite o responsável"
                    />
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

            {/* Data de vencimento */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Data de vencimento:</Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="date"
                        required
                        value={dataVencimento}
                        onChange={(e) => setDataVencimento(e.target.value)}
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
