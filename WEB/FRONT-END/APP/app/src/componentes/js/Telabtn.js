import React, { useState } from 'react';
import Botao from '../../componentes/js/Botao';
import Modalp from '../../componentes/js/Modalp';
import Tela from '../../componentes/js/Tela';
import { Container } from 'react-bootstrap';
import '../../paginas/css/Home.css';

const Telabtn = ({ textoBotao, onClick }) => {
    const [modalVisivel, setModalVisivel] = useState(false);

    return (
        <Tela>
            <div className="up">
                <Botao texto={textoBotao} tipo={"botao-laranja"} onClick={onClick} />
            </div>
            <Container fluid className="conteudo">
            </Container>
        </Tela>
    );
};

export default Telabtn;