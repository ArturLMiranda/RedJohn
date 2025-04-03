import React, { useState } from 'react';
import Modalp from '../../componentes/js/Modalp';
import '../css/Home.css';
import Telabtn from '../../componentes/js/Telabtn';
import Linhas from '../../componentes/js/Linhas';
import FormularioNomeConfig from '../../componentes/js/FormularioNomeConfig';
import FormularioNome from '../../componentes/js/FormularioNome';

const Responsaveis = () => {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [modalVisivel2, setModalVisivel2] = useState(false);
    const [responsavelSelecionado, setResponsavelSelecionado] = useState(null);

    // Lista de responsáveis
    const responsaveis = [
        { id: 1, nome: 'Responsável 1' },
        { id: 2, nome: 'Responsável 2' },
        { id: 3, nome: 'Responsável 3' }
    ];

    return (
        <>
            <Telabtn textoBotao="Novo Responsável" onClick={() => setModalVisivel2(true)}>
                <Linhas lista={responsaveis} onclick={(item) => {
                    setResponsavelSelecionado(item);
                    setModalVisivel(true);
                }} />
            </Telabtn>

            {/* Modal de Configuração do Nome */}
            <Modalp show={modalVisivel} handleClose={() => setModalVisivel(false)}>
                <FormularioNomeConfig responsavel={responsavelSelecionado} />
            </Modalp>

            {/* Modal de Cadastro de Nome */}
            <Modalp show={modalVisivel2} handleClose={() => setModalVisivel2(false)}>
                <FormularioNome />
            </Modalp>
        </>
    );
};

export default Responsaveis;
