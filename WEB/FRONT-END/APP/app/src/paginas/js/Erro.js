import React, { useState } from 'react';
import Botao from '../../componentes/js/Botao';
import CardDemanda from '../../componentes/js/CardDemanda';
import Modalp from '../../componentes/js/Modalp';
import ConfigDemanda from "../../componentes/js/ConfigDemanda"
import NovaDemanda from '../../componentes/js/NovaDemanda';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Home.css';
import Tela from '../../componentes/js/Tela';

const Erro = () => {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [modalDemandaVisivel, setModalDemandaVisivel] = useState(false);
    const [demandaSelecionada, setDemandaSelecionada] = useState(null);

    const dados = [
        { titulo: 'Fazer telas para o wazhur no zabix', demandante: 'João', responsavel: 'Maria', descricao: 'Detalhes...', cor: '#FF5733' },
        { titulo: 'Demanda 2', demandante: 'Carlos', responsavel: 'Ana', descricao: 'Detalhes...', cor: '#FF5733' },
        { titulo: 'Demanda 3', demandante: 'Fernanda', responsavel: 'Juliana', descricao: 'Detalhes...', cor: '#FF5733' },
        { titulo: 'Demanda 4', demandante: 'Ricardo', responsavel: 'Roberta', descricao: 'Detalhes...', cor: '#FF5733' },
        { titulo: 'Demanda 5', demandante: 'Mariana', responsavel: 'Paulo', descricao: 'Detalhes...', cor: '#FF5733' },
        { titulo: 'Demanda 6', demandante: 'Bruno', responsavel: 'Carla', descricao: 'Detalhes...', cor: '#FF5733' },
        { titulo: 'Demanda 7', demandante: 'Gustavo', responsavel: 'Bianca', descricao: 'Detalhes...', cor: '#FF5733' }
    ];

    const abrirModalDemanda = (demanda) => {
        setDemandaSelecionada(demanda);
        setModalDemandaVisivel(true);
    };

    return (
                <Tela>
                    <Container fluid className="conteudo">
                        <Row className="gx-3 gy-3">
                            {dados.map((d, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={3}>
                                    <CardDemanda {...d} onOpenModal={() => abrirModalDemanda(d)} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                    <Modalp show={modalVisivel} handleClose={() => setModalVisivel(false)}>
                        <NovaDemanda />
                    </Modalp>
                    <Modalp show={modalDemandaVisivel} handleClose={() => setModalDemandaVisivel(false)}>
                        <ConfigDemanda></ConfigDemanda>
                    </Modalp>
        </Tela>
    );
};

export default Erro;
