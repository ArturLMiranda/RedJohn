import React, { useState } from 'react';
import BarraLateral from '../componentes/BarraLateral';
import BarraSuperior from '../componentes/BarraSuperior';
import CardDemanda from '../componentes/CardDemanda';
import ModalNovaDemanda from '../componentes/Modal';
import Botao from '../componentes/Botao';
import { Container, Row, Col } from 'react-bootstrap'; // Importando Bootstrap
import './Home.css';

const Home = () => {
    const [modalVisivel, setModalVisivel] = useState(false);

    const dados = [
        { titulo: 'Demanda 1', demandante: 'João', responsavel: 'Maria', descricao: 'Detalhes...', cor: '#FFCC00' },
        { titulo: 'Demanda 2', demandante: 'Carlos', responsavel: 'Ana', descricao: 'Detalhes...', cor: '#FF5733' },
        { titulo: 'Demanda 3', demandante: 'Fernanda', responsavel: 'Juliana', descricao: 'Detalhes...', cor: '#33FF57' },
        { titulo: 'Demanda 4', demandante: 'Ricardo', responsavel: 'Roberta', descricao: 'Detalhes...', cor: '#33A1FF' },
        { titulo: 'Demanda 5', demandante: 'Mariana', responsavel: 'Paulo', descricao: 'Detalhes...', cor: '#FF9933' },
        { titulo: 'Demanda 6', demandante: 'Bruno', responsavel: 'Carla', descricao: 'Detalhes...', cor: '#FF3399' },
        { titulo: 'Demanda 7', demandante: 'Gustavo', responsavel: 'Bianca', descricao: 'Detalhes...', cor: '#FFCCFF' }
    ];

    return (
        <div>
            <BarraSuperior />
            <div className="home">
                <BarraLateral />
                <div className="lista">
                    <div className="up">
                        <Botao texto="Nova Demanda" onClick={() => setModalVisivel(true)} />
                    </div>
                    <Container fluid className="conteudo">
                        <Row className="gx-3 gy-3">
                            {dados.map((d, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={3}>
                                    <CardDemanda {...d} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                    <ModalNovaDemanda show={modalVisivel} handleClose={() => setModalVisivel(false)} />
                </div>
            </div>
        </div>
    );
};

export default Home;
