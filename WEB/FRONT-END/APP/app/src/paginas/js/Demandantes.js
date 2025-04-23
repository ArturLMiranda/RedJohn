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

    // Função para carregar a lista de demandantes
    const carregarDemandantes = async () => {
        const dados = await buscarDemandantes();
        setDemandantes(dados);
    };

    // Função para deletar um demandante
    const handleDeletarDemandante = async () => {
        if (demandanteSelecionado && window.confirm("Deseja realmente excluir este demandante?")) {
            try {
                await deletarDemandante(demandanteSelecionado.id);
                setModalVisivel(false);
                carregarDemandantes(); // Atualiza a lista após exclusão
            } catch (error) {
                console.error('Erro ao deletar demandante:', error);
            }
        }
    };

    // Função para editar um demandante
    const handleEditarDemandante = async (nome) => {
        if (!demandanteSelecionado) return;
        try {
            await editarDemandante(demandanteSelecionado.id, nome);
            setModalVisivel(false);
            carregarDemandantes(); // Atualiza a lista após edição
        } catch (error) {
            console.error('Erro ao editar demandante:', error);
        }
    };

    // Função para criar um novo demandante
    const handleCriarDemandante = async (nome) => {
        try {
            await criarDemandante(nome);
            setModalVisivel2(false);
            carregarDemandantes(); // Atualiza a lista após criação
        } catch (error) {
            console.error('Erro ao criar demandante:', error);
        }
    };

    // Carregar demandantes ao montar o componente
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

            {/* Modal de Configuração do Nome do Demandante */}
            <Modalp show={modalVisivel} handleClose={() => setModalVisivel(false)} titulo={"Configuração Demandante"}>
                <FormularioNomeConfig 
                    demandante={demandanteSelecionado} 
                    onClickDelete={handleDeletarDemandante} 
                    onClickSalvar={handleEditarDemandante} 
                />
            </Modalp>

            {/* Modal de Cadastro de Novo Demandante */}
            <Modalp show={modalVisivel2} handleClose={() => setModalVisivel2(false)} titulo={"Novo Demandante"}>
                <FormularioNome onClick={handleCriarDemandante} />
            </Modalp>
        </>
    );
};

export default Demandante;
