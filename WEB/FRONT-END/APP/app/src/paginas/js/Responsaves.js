import React, { useState, useEffect } from 'react';
import Modalp from '../../componentes/js/Modalp';
import '../css/Home.css';
import Telabtn from '../../componentes/js/Telabtn';
import Linhas from '../../componentes/js/Linhas';
import FormularioNomeConfig from '../../componentes/js/FormularioNomeConfig';
import FormularioNome from '../../componentes/js/FormularioNome';
import deletarResponsavel from '../../componentes/utils/Responsaves/deletarResponsavel';
import buscarResponsaveis from '../../componentes/utils/Responsaves/buscarResponsaveis';
import criarResponsavel from '../../componentes/utils/Responsaves/criarResponsavel';
import editarResponsavel from '../../componentes/utils/Responsaves/editarResponsavel';

const Responsaveis = () => {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [modalVisivel2, setModalVisivel2] = useState(false);
    const [responsavelSelecionado, setResponsavelSelecionado] = useState(null);
    const [responsaveis, setResponsaveis] = useState([]);

    const carregarResponsaveis = async () => {
        const dados = await buscarResponsaveis();
        setResponsaveis(dados);
    };
    const handleDeletarResponsavel = async () => {
        if (responsavelSelecionado && window.confirm("Deseja realmente excluir este responsável?")) {
            try {
                await deletarResponsavel(responsavelSelecionado.id);
                setModalVisivel(false);
                carregarResponsaveis(); // Atualiza a lista
            } catch (error) {
                console.error('Erro ao deletar responsável:', error);
            }
        }
    };
    const handleEditarResponsavel = async (nome) => {
        if (!responsavelSelecionado) return;
        try {
            await editarResponsavel(responsavelSelecionado.id, nome);
            setModalVisivel(false);
            carregarResponsaveis(); // Atualiza lista
        } catch (error) {
            console.error('Erro ao editar responsável:', error);
        }
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
                <FormularioNomeConfig responsavel={responsavelSelecionado} onClickDelete={handleDeletarResponsavel} onClickSalvar={handleEditarResponsavel} />
            </Modalp>

            {/* Modal de Cadastro de Nome */}
            <Modalp show={modalVisivel2} handleClose={() => setModalVisivel2(false)} titulo={"Novo Responsável"}>
                <FormularioNome onClick={handleCriarResponsavel} />
            </Modalp>
        </>
    );
};

export default Responsaveis;
