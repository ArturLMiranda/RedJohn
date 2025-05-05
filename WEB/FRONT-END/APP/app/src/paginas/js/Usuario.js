import React, { useState, useEffect } from 'react';
import Modalp from '../../componentes/js/Modalp';
import '../css/Home.css';
import Telabtn from '../../componentes/js/Telabtn';
import LinhasUsuarios from '../../componentes/js/LinhasUsuarios';
import FormularioUsuarioNovo from '../../componentes/js/FormularioUsuarioNovo';
import FormularioUsuario from '../../componentes/js/FormularioUsuario';
import axios from 'axios';

const Usuario = () => {
    const [modalVisivel, setModalVisivel] = useState(false);
    const [modalVisivel2, setModalVisivel2] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    const carregarUsuarios = () => {
        axios.get('http://localhost:8000/api/usuarios/')
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error("Erro ao carregar usuários:", error);
            });
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const abrirModalEditar = (usuario) => {
        setUsuarioSelecionado(usuario);
        setModalVisivel2(true);
    };

    return (
        <>
            <Telabtn textoBotao="Novo Usuário" onClick={() => setModalVisivel(true)}>
                <LinhasUsuarios lista={usuarios} onClick={abrirModalEditar} />
            </Telabtn>

            <Modalp show={modalVisivel} titulo="Novo Usuário" handleClose={() => setModalVisivel(false)}>
                <FormularioUsuarioNovo
                    onUpdate={() => {
                        carregarUsuarios();
                        setModalVisivel(false);
                    }}
                />
            </Modalp>

            <Modalp show={modalVisivel2} titulo="Configuração do Usuário" handleClose={() => setModalVisivel2(false)}>
                <FormularioUsuario
                    usuario={usuarioSelecionado}
                    onUpdate={() => {
                        carregarUsuarios();
                        setModalVisivel2(false);
                    }}
                />
            </Modalp>
        </>
    );
};

export default Usuario;
