import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Botao from '../../componentes/js/Botao';
import Modalp from '../../componentes/js/Modalp';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Home.css';
import Telabtn from '../../componentes/js/Telabtn';
import LinhasUsuarios from '../../componentes/js/LinhasUsuarios';
import FormularioUsuarioNovo from '../../componentes/js/FormularioUsuarioNovo';
import FormularioUsuario from '../../componentes/js/FormularioUsuario';

const Usuario = () => {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [modalVisivel2, setModalVisivel2] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

    // Buscar usuários ao carregar
    useEffect(() => {
        axios.get('/api/usuarios/')
            .then(res => {
                setUsuarios(res.data);
            })
            .catch(err => {
                console.error('Erro ao buscar usuários:', err);
            });
    }, []);

    const abrirModalUsuario = () => {
        console.log("Abrindo modal de configuração do usuário...");
        setModalVisivel2(true);
    };

    return (
        <>
            <Telabtn textoBotao="Novo Usuário" onClick={() => setModalVisivel(true)}>
                <LinhasUsuarios lista={usuarios} onClick={abrirModalUsuario} />
            </Telabtn>

            <Modalp show={modalVisivel} titulo="Novo Usuário" handleClose={() => setModalVisivel(false)}>
                <FormularioUsuarioNovo />
            </Modalp>

            <Modalp show={modalVisivel2} titulo="Configuração do Usuário" handleClose={() => setModalVisivel2(false)}>
                <FormularioUsuario />
            </Modalp>
        </>
    );
};

export default Usuario;
