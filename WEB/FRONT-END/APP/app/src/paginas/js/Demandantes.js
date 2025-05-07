import React, { useState, useEffect } from 'react';
import Modalp from '../../componentes/js/Modalp';
import '../css/Home.css';
import Telabtn from '../../componentes/js/Telabtn';
import Linhas from '../../componentes/js/Linhas';
import FormularioNomeConfig from '../../componentes/js/FormularioNomeConfig';
import FormularioNome from '../../componentes/js/FormularioNome';
import deletarDemandante from '../../componentes/utils/Demandante/deletarDemandante';
import buscarDemandantes from '../../componentes/utils/Demandante/buscarDemandantes';
import criarDemandante from '../../componentes/utils/Demandante/criarDemandante';
import editarDemandante from '../../componentes/utils/Demandante/editarDemandante';

const Demandante = () => {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [modalVisivel2, setModalVisivel2] = useState(false);
    const [demandanteSelecionado, setDemandanteSelecionado] = useState(null);
    const [demandantes, setDemandantes] = useState([]); 

    const carregarDemandantes = async () => {
        const dados = await buscarDemandantes();
        setDemandantes(dados);
    };

    const handleDeletarDemandante = async () => {
        if (demandanteSelecionado && window.confirm("Deseja realmente excluir este demandante?")) {
            try {
                await deletarDemandante(demandanteSelecionado.id);
                setModalVisivel(false);
                carregarDemandantes();
            } catch (error) {
                console.error('Erro ao deletar demandante:', error);
            }
        }
    };

    const handleEditarDemandante = async (nome) => {
        if (!demandanteSelecionado) return;
        try {
            await editarDemandante(demandanteSelecionado.id, nome);
            setModalVisivel(false);
            carregarDemandantes();
        } catch (error) {
            console.error('Erro ao editar demandante:', error);
        }
    };

    const handleCriarDemandante = async (nome) => {
        try {
            await criarDemandante(nome);
            setModalVisivel2(false);
            carregarDemandantes();
        } catch (error) {
            console.error('Erro ao criar demandante:', error);
        }
    };

    useEffect(() => {
        carregarDemandantes();
    }, []);

    return (
        <>
            <Telabtn textoBotao="Novo Demandante" onClick={() => setModalVisivel2(true)}>
                <Linhas lista={demandantes} onclick={(item) => {
                    setDemandanteSelecionado(item);
                    setModalVisivel(true);
                }} />
            </Telabtn>

            {/* Modal de Edição */}
            <Modalp show={modalVisivel} handleClose={() => setModalVisivel(false)} titulo="Editar Demandante">
                <FormularioNome
                    entidade={demandanteSelecionado}
                    onClickSalvar={handleEditarDemandante}
                    onClickDelete={handleDeletarDemandante}
                />
            </Modalp>

            {/* Modal de Criação */}
            <Modalp show={modalVisivel2} handleClose={() => setModalVisivel2(false)} titulo="Novo Demandante">
                <FormularioNomeConfig onClickSalvar={handleCriarDemandante} />
            </Modalp>
        </>
    );
};

export default Demandante;
