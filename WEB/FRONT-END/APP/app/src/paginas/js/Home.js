import React, { useState, useEffect } from 'react';
import Botao from '../../componentes/js/Botao';
import CardDemanda from '../../componentes/js/CardDemanda';
import Modalp from '../../componentes/js/Modalp';
import ConfigDemanda from "../../componentes/js/ConfigDemanda"
import NovaDemanda from '../../componentes/js/NovaDemanda';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Home.css';
import Tela from '../../componentes/js/Tela';
import buscarAtividades from '../../componentes/utils/home/buscarAtividades';

const Home = () => {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [modalDemandaVisivel, setModalDemandaVisivel] = useState(false);
    const [dados, setDados] = useState([]);
    const [demandaSelecionada, setDemandaSelecionada] = useState(null); // Novo estado para a demanda selecionada

    useEffect(() => {
        buscarAtividades().then(setDados);
    }, []);

    const abrirModalDemanda = (demanda) => {
        setDemandaSelecionada(demanda);  // Define a demanda selecionada
        setModalDemandaVisivel(true);  // Abre o modal de configuração
    };

    return (
        <Tela>
            <div className="up">
                <Botao texto="Nova Demanda" tipo={"botao-laranja"} onClick={() => setModalVisivel(true)} />
            </div>
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
                {/* Passa a demanda selecionada para o componente ConfigDemanda */}
                <ConfigDemanda demanda={demandaSelecionada} />
            </Modalp>
        </Tela>
    );
};

export default Home;
