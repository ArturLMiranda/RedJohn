import React, { useState } from 'react';
import Botao from '../../componentes/js/Botao';
import Modalp from '../../componentes/js/Modalp';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Home.css';
import Telabtn from '../../componentes/js/Telabtn';
import LinhasUsuarios from '../../componentes/js/LinhasUsuarioas';
import FormularioNomeConfig from '../../componentes/js/FomurarioNomeConfig';


const Usuario = () => {
    const [modalVisivel, setModalVisivel] = useState(false);

    // Lista de usuários
    const usuarios = [
        { id: 1, nome: 'Usuário 1', tipo: 'Admin' },
        { id: 2, nome: 'Usuário 2', tipo: 'Admin' },
        { id: 3, nome: 'Usuário 3', tipo: 'Admin' }
    ];

    return (
        <>
            <Telabtn textoBotao="Novo Responsável" onClick={() => setModalVisivel(true)}>
                <LinhasUsuarios lista={usuarios} onclick={() => setModalVisivel(true)} />
            </Telabtn>

            <Modalp show={modalVisivel} handleClose={() => setModalVisivel(false)}>
                <FormularioNomeConfig />
            </Modalp>
        </>
    );
};

export default Usuario;
