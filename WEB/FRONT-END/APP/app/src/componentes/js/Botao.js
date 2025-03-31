import React from 'react';
import '../css/Botao.css';

const Botao = ({ onClick, texto,tipo }) => {
    return (
        <button className={tipo} onClick={onClick} > 
            {texto}
        </button>
    );
};

export default Botao;
