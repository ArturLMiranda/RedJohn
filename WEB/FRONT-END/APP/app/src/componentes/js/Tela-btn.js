import React, { useState } from 'react';
import BarraLateral from '../../componentes/js/BarraLateral';
import BarraSuperior from '../../componentes/js/BarraSuperior';
import '../../paginas/css/Home.css';

const Tela = ({ children}) => {
    return (
        <div className='Ba'>
            <BarraSuperior />
            <div className="home">
                <BarraLateral />
                <div className="lista">
                    {children}
                </div>
            </div>
        </div>
    );
};
export default Tela;