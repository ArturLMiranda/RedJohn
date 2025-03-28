import React, { useState } from 'react';
import BarraLateral from '../componentes/BarraLateral';
import BarraSuperior from '../componentes/BarraSuperior';
import Card from '../componentes/Card';
import ModalNovaDemanda from '../componentes/Modal';
import Botao from '../componentes/Botao';
import './Home.css';  // Importando o CSS correto

const Home = () => {
    const [modalVisivel, setModalVisivel] = useState(false);

    const dados = [
        { titulo: 'Demanda 1', demandante: 'João', responsavel: 'Maria', descricao: 'Detalhes...', cor: 'yellow' },
        { titulo: 'Demanda 2', demandante: 'Carlos', responsavel: 'Ana', descricao: 'Detalhes...', cor: 'red' }
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
                    <div className="conteudo">
                        {dados.map((d, index) => (
                            <Card key={index} {...d} />
                        ))}
                    </div>
                    <ModalNovaDemanda show={modalVisivel} handleClose={() => setModalVisivel(false)} />
                </div>
            </div>
        </div>
    );
};

export default Home;
