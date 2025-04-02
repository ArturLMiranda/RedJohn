import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import BotaoEngrenagem from '../../componentes/js/BotaoEngrenagem';
import Telabtn from '../../componentes/js/Telabtn';
import Linhas from "../../componentes/js/Linhas";

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
        <Telabtn textoBotao="Novo Demandante" onClick={null}>
            <Linhas lista={demandantes} onclick={() => setModalVisivel(true)} />
        </Telabtn>
    );
};

export default Demandantes;
