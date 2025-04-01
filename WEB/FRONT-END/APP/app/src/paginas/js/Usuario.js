import React, { useState } from 'react';
import Botao from '../../componentes/js/Botao';
import Modalp from '../../componentes/js/Modalp';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Home.css';
import Telabtn from '../../componentes/js/Telabtn';

const Usuario = () => {
    const [modalVisivel, setModalVisivel] = useState(false);
    

    return (
        <Telabtn textoBotao="Novo Responsável" onClick={null}>

        </Telabtn>
    );
};
export default Usuario;