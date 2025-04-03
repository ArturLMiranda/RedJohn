import React from 'react';
import { Row, Col } from 'react-bootstrap'; // Importando componentes do Bootstrap
import '../css/BarraSuperior.css';

// Importando a imagem
import logoImg from '../Img/logo1.png'; // Caminho relativo para a imagem

const BarraSuperior = () => {
    return (
        <div className="barra-superior">
            <Row>
                <Col  className="c-3">
                    {/* Usando a imagem importada */}
                    <img 
                        src={logoImg} 
                        alt="Logo"  
                    />
                </Col>
            </Row>
        </div>
    );
};

export default BarraSuperior;