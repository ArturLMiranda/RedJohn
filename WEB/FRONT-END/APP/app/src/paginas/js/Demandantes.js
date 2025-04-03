import React, { useState, useEffect } from 'react';
import Modalp from '../../componentes/js/Modalp';
import Telabtn from '../../componentes/js/Telabtn';
import Linhas from "../../componentes/js/Linhas";
import FormularioNomeConfig from "../../componentes/js/FormularioNomeConfig";
import FormularioNome from "../../componentes/js/FormularioNome";

const Demandantes = () => {
    const [demandantes, setDemandantes] = useState([]);
    const [modalCadastroVisivel, setModalCadastroVisivel] = useState(false);
    const [modalConfigVisivel, setModalConfigVisivel] = useState(false);

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
            <Telabtn textoBotao="Novo Demandante" onClick={() => setModalCadastroVisivel(true)} >
                <Linhas 
                    lista={demandantes} 
                    onclick={(item) => {
                        setModalConfigVisivel(true);
                    }} 
                />
            </Telabtn>

            {/* Modal de Configuração do Nome */}
            <Modalp show={modalConfigVisivel} handleClose={() => setModalConfigVisivel(false) }titulo={"Configuração Demandante"}>
                <FormularioNomeConfig/>
            </Modalp>

            {/* Modal de Cadastro de Nome */}
            <Modalp show={modalCadastroVisivel} handleClose={() => setModalCadastroVisivel(false)} titulo={"Novo Demandante"}>
                <FormularioNome />
            </Modalp>
        </>
    );
};

export default Demandantes;
