import React from 'react';
import '../css/Botao.css';

const Botao = ({ onClick, texto,tipo,style}) => {
    return (
        <button className={tipo} onClick={onClick}  style={style}> 
            {texto}
        </button>
    );
};

export default Botao;
