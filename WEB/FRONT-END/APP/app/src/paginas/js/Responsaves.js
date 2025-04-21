import React, { useState, useEffect } from 'react';
import Modalp from '../../componentes/js/Modalp';
import '../css/Home.css';
import Telabtn from '../../componentes/js/Telabtn';
import Linhas from '../../componentes/js/Linhas';
import FormularioNomeConfig from '../../componentes/js/FormularioNomeConfig';
import FormularioNome from '../../componentes/js/FormularioNome';

import buscarResponsaveis from '../../utils/responsaveis/buscarResponsaveis';
import criarResponsavel from '../../utils/responsaveis/criarResponsavel';

const Responsaveis = () => {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [modalVisivel2, setModalVisivel2] = useState(false);
    const [responsavelSelecionado, setResponsavelSelecionado] = useState(null);
    const [responsaveis, setResponsaveis] = useState([]);

    const carregarResponsaveis = async () => {
        const dados = await buscarResponsaveis();
        setResponsaveis(dados);
    };

    useEffect(() => {
        carregarResponsaveis();
    }, []);

    const handleCriarResponsavel = async (nome) => {
        try {
            await criarResponsavel(nome);
            setModalVisivel2(false);
            carregarResponsaveis(); // Atualiza lista após criação
        } catch (error) {
            console.error('Erro ao criar responsável:', error);
        }
    };

    return (
        <>
            <Telabtn textoBotao="Novo Responsável" onClick={() => setModalVisivel2(true)}>
                <Linhas lista={responsaveis} onclick={(item) => {
                    setResponsavelSelecionado(item);
                    setModalVisivel(true);
                }} />
            </Telabtn>

            {/* Modal de Configuração do Nome */}
            <Modalp show={modalVisivel} handleClose={() => setModalVisivel(false)} titulo={"Configuração Responsável"}>
                <FormularioNomeConfig responsavel={responsavelSelecionado} />
            </Modalp>

            {/* Modal de Cadastro de Nome */}
            <Modalp show={modalVisivel2} handleClose={() => setModalVisivel2(false)} titulo={"Novo Responsável"}>
                <FormularioNome onClick={handleCriarResponsavel} />
            </Modalp>
        </>
    );
};

export default Responsaveis;
