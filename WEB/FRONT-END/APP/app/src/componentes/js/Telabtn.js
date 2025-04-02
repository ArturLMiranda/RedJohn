import React, { Children, useState } from 'react';
import Botao from '../../componentes/js/Botao';
import Tela from '../../componentes/js/Tela';
import { Container } from 'react-bootstrap';
import '../../paginas/css/Home.css';

const Telabtn = ({ textoBotao, onClick, children }) => { // "children" com "c" minúsculo


    return (
        <Tela>
            <div className="up">
                <Botao texto={textoBotao} tipo={"botao-laranja"} onClick={onClick} />
            </div>
            <Container fluid className="conteudo">
                {children} {/* Agora os elementos filhos serão renderizados corretamente */}
            </Container>
        </Tela>
    );
};

export default Telabtn;