import React, { useState, useEffect } from 'react';
import { CadastrarUsuario, EditarUsuario, DeletarUsuario } from './api/usuarios';
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
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Fetching users to display in the list
        axios.get('/api/usuarios/')
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error("Erro ao carregar usuários:", error);
            });
    }, []);

    const handleCadastrar = (usuario) => {
        CadastrarUsuario(usuario, limparFormulario);
    };

    const handleEditar = (usuarioId, dadosUsuario) => {
        EditarUsuario(usuarioId, dadosUsuario, limparFormulario, (msg) => alert(msg));
    };

    const handleDeletar = (usuarioId) => {
        DeletarUsuario(usuarioId, () => {
            setUsuarios((prevUsuarios) => prevUsuarios.filter(usuario => usuario.id !== usuarioId));
        });
    };

    const limparFormulario = () => {
        // Reset your form fields here
    };

    return (
        <>
            <Telabtn textoBotao="Novo Usuário" onClick={() => setModalVisivel(true)}>
                <LinhasUsuarios lista={usuarios} onClick={() => setModalVisivel2(true)} />
            </Telabtn>

            {/* Modal para novo usuário */}
            <Modalp show={modalVisivel} titulo="Novo Usuário" handleClose={() => setModalVisivel(false)}>
                <FormularioUsuarioNovo onClick={handleCadastrar} onClickDelete={() => setModalVisivel(false)} />
            </Modalp>

            {/* Modal para editar usuário */}
            <Modalp show={modalVisivel2} titulo="Configuração do Usuário" handleClose={() => setModalVisivel2(false)}>
                <FormularioUsuario onClick={handleEditar} onClickDelete={() => setModalVisivel2(false)} />
            </Modalp>
        </>
    );
};

export default Usuario;
