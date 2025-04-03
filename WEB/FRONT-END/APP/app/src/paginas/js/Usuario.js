import React, { useState } from 'react';
import Botao from '../../componentes/js/Botao';
import Modalp from '../../componentes/js/Modalp';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Home.css';
import Telabtn from '../../componentes/js/Telabtn';
import LinhasUsuarios from '../../componentes/js/LinhasUsuarios'; // nome correto

import FormularioUsuarioNovo from '../../componentes/js/FormularioUsuarioNovo';
import FormularioUsuario from '../../componentes/js/FormularioUsuario';

const Usuario = () => {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [modalVisivel2, setModalVisivel2] = useState(false);

    // Lista de usuários
    const usuarios = [
        { id: 1, nome: 'Usuário 1', tipo: 'Admin' },
        { id: 2, nome: 'Usuário 2', tipo: 'Admin' },
        { id: 3, nome: 'Usuário 3', tipo: 'Admin' }
    ];

    // Função para abrir o modal ao clicar em um usuário
    const abrirModalUsuario = () => {
        console.log("Abrindo modal de configuração do usuário...");
        setModalVisivel2(true);
    };

    return (
        <>
            <Telabtn textoBotao="Novo Usuário" onClick={() => setModalVisivel(true)}>
                <LinhasUsuarios lista={usuarios} onClick={() => setModalVisivel2(true)} /> 
            </Telabtn>


            {/* Modal para novo usuário */}
            <Modalp show={modalVisivel} titulo="Novo Usuário" handleClose={() => setModalVisivel(false)}>
                <FormularioUsuarioNovo />
            </Modalp>

            {/* Modal para editar usuário */}
            <Modalp show={modalVisivel2} titulo="Configuração do Usuário" handleClose={() => setModalVisivel2(false)}>
                <FormularioUsuario />
            </Modalp>
        </>
    );
};

export default Usuario;
