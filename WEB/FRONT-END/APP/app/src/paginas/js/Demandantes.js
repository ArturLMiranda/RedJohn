import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import BotaoEngrenagem from '../../componentes/js/BotaoEngrenagem';
import Telabtn from '../../componentes/js/Telabtn';

const Demandantes = () => {
    const [demandantes, setDemandantes] = useState([]);
    const [modalVisivel, setModalVisivel] = useState(false);

    useEffect(() => {
        // Simulação de dados vindos do backend
        const fetchDemandantes = async () => {
            const dados = [
                { id: 1, nome: 'Demandante 1' },
                { id: 2, nome: 'Demandante 2' },
                { id: 3, nome: 'Demandante 3' }
            ];
            setDemandantes(dados);
        };
        fetchDemandantes();
    }, []);

    return (
        <Telabtn textoBotao="Novo Responsável" onClick={null}>
                {demandantes.map((demandante) => (
                    <Card key={demandante.id} className="mb-2" style={{ backgroundColor: '#2F2F31', color: 'white' }}>
                        <Row className="align-items-center p-2">
                            <Col xs={1}>
                                <Form.Check type="checkbox" />
                            </Col>
                            <Col xs={9}>
                                <span>{demandante.nome}</span>
                            </Col>
                            <Col xs={2} className="text-end">
                                <BotaoEngrenagem onClick={() => setModalVisivel(true)} />
                            </Col>
                        </Row>
                    </Card>
                ))}
        </Telabtn>
    );
};

export default Demandantes;