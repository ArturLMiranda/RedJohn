import React, { useState } from 'react';
import Botao from '../../componentes/js/Botao';
import Modalp from '../../componentes/js/Modalp';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Home.css';
import Tela from '../../componentes/js/Tela';

const Responsaves = () => {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [modalDemandaVisivel, setModalDemandaVisivel] = useState(false);
    const [demandaSelecionada, setDemandaSelecionada] = useState(null);

    const dados = [
        { titulo: 'Fazer telas para o wazhur no zabix', demandante: 'João', responsavel: 'Maria', descricao: 'Detalhes...', cor: '#FFCC00' },
        { titulo: 'Demanda 2', demandante: 'Carlos', responsavel: 'Ana', descricao: 'Detalhes...', cor: '#FF5733' },
        { titulo: 'Demanda 3', demandante: 'Fernanda', responsavel: 'Juliana', descricao: 'Detalhes...', cor: '#33FF57' },
        { titulo: 'Demanda 4', demandante: 'Ricardo', responsavel: 'Roberta', descricao: 'Detalhes...', cor: '#33A1FF' },
        { titulo: 'Demanda 5', demandante: 'Mariana', responsavel: 'Paulo', descricao: 'Detalhes...', cor: '#FF9933' },
        { titulo: 'Demanda 6', demandante: 'Bruno', responsavel: 'Carla', descricao: 'Detalhes...', cor: '#FF3399' },
        { titulo: 'Demanda 7', demandante: 'Gustavo', responsavel: 'Bianca', descricao: 'Detalhes...', cor: '#FFCCFF' }
    ];

    const abrirModalDemanda = (demanda) => {
        setDemandaSelecionada(demanda);
        setModalDemandaVisivel(true);
    };

    return (
                <Tela>
                    <div className="up">
                        <Botao texto="Novo Responsavel" tipo={"botao-laranja"} onClick={() => setModalVisivel(true)} />
                    </div>
                    <Container fluid className="conteudo">
                        
                    </Container>
                    <Modalp show={modalVisivel} handleClose={() => setModalVisivel(false)}>
                        
                    </Modalp>
        </Tela>
    );
};
export default Responsaves;