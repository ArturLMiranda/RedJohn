import React, { useState, useEffect } from 'react';
import Botao from '../../componentes/js/Botao';
import CardDemanda from '../../componentes/js/CardDemanda';
import Modalp from '../../componentes/js/Modalp';
import ConfigDemanda from "../../componentes/js/ConfigDemanda";
import NovaDemanda from '../../componentes/js/NovaDemanda';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Home.css';
import Tela from '../../componentes/js/Tela';
import buscarAtividades from '../../componentes/utils/home/buscarAtividades';

const Home = () => {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [modalDemandaVisivel, setModalDemandaVisivel] = useState(false);
    const [dados, setDados] = useState([]);
    const [demandaSelecionada, setDemandaSelecionada] = useState(null);

    const carregarAtividades = async () => {
        const atividades = await buscarAtividades();
        if (Array.isArray(atividades)) {
            setDados(atividades);
        } else {
            console.error('Erro ao carregar atividades');
        }
    };

    useEffect(() => {
        carregarAtividades();
    }, []);

    const abrirModalDemanda = (demanda) => {
        setDemandaSelecionada(demanda);
        setModalDemandaVisivel(true);
    };

    const fecharModalNovaDemanda = () => {
        setModalVisivel(false);
    };

    const fecharModalDemanda = () => {
        setModalDemandaVisivel(false);
    };

    return (
        <Tela>
            <div className="up">
                <Botao texto="Nova Demanda" tipo={"botao-laranja"} onClick={() => setModalVisivel(true)} />
            </div>
            <Container fluid className="conteudo">
                <Row className="gx-3 gy-3">
                    {dados.length > 0 ? (
                        dados.map((d) => (
                            <Col key={d.id} xs={12} sm={6} md={4} lg={3}>
                                <CardDemanda
                                    titulo={d.titulo}
                                    demandante={d.demandante}
                                    responsavel={d.responsaveis}
                                    descricao={d.descricao}
                                    status={d.status}
                                    validade={d.validade}
                                    onOpenModal={() => abrirModalDemanda(d)}
                                />
                            </Col>
                        ))
                    ) : (
                        <div className="col-12">Carregando atividades...</div>
                    )}
                </Row>
            </Container>
            <Modalp show={modalVisivel} handleClose={fecharModalNovaDemanda}>
                <NovaDemanda />
            </Modalp>
            <Modalp show={modalDemandaVisivel} handleClose={fecharModalDemanda}>
                <ConfigDemanda 
                    demanda={demandaSelecionada} 
                    onAtualizarAtividades={carregarAtividades}
                    onFechar={fecharModalDemanda}
                />
            </Modalp>
        </Tela>
    );
};

export default Home;
