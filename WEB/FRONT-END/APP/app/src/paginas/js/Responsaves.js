import React, { useState } from 'react';
import Botao from '../../componentes/js/Botao';
import Modalp from '../../componentes/js/Modalp';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Home.css';
import Telabtn from '../../componentes/js/Telabtn';
import Linhas from '../../componentes/js/Linhas'; // Importando Linhas corretamente

const Responsaves = () => {
    const [modalVisivel, setModalVisivel] = useState(false);

    // Lista de responsáveis
    const responsaveis = [
        { id: 1, nome: 'Responsável 1' },
        { id: 2, nome: 'Responsável 2' },
        { id: 3, nome: 'Responsável 3' }
    ];

    return (
        <Telabtn textoBotao="Novo Responsável" onClick={() => setModalVisivel(true)}>
            <Linhas lista={responsaveis} onclick={() => setModalVisivel(true)} />
        </Telabtn>
    );
};

export default Responsaves;
