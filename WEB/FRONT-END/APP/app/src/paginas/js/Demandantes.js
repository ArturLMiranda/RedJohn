import React, { useState, useEffect } from 'react';
import Modalp from '../../componentes/js/Modalp';
import Telabtn from '../../componentes/js/Telabtn';
import Linhas from "../../componentes/js/Linhas";
import FormularioNomeConfig from "../../componentes/js/FormularioNomeConfig";

const Demandantes = () => {
    const [demandantes, setDemandantes] = useState([]);
    const [modalVisivel, setModalVisivel] = useState(false);
    const [demandanteSelecionado, setDemandanteSelecionado] = useState(null);

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
        <>
            <Telabtn textoBotao="Novo Demandante" onClick={() => setModalVisivel(true)}>
                <Linhas lista={demandantes} onclick={(item) => {
                    setDemandanteSelecionado(item);
                    setModalVisivel(true);
                }} />
            </Telabtn>

            {/* Modal de Configuração do Demandante */}
            <Modalp show={modalVisivel} handleClose={() => setModalVisivel(false)}>
                <FormularioNomeConfig demandante={demandanteSelecionado} />
            </Modalp>
        </>
    );
};

export default Demandantes;
