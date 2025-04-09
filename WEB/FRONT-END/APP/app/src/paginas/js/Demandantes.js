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
        const fetchDemandantes = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/demandantes/ultimos/");
                if (!response.ok) throw new Error("Erro ao buscar demandantes");
                const dados = await response.json();
                setDemandantes(dados);
            } catch (error) {
                console.error("Erro ao buscar demandantes:", error.message);
            }
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
