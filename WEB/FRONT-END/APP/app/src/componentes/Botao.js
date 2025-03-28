import React from 'react';
import './Botao.css';

const Botao = ({ onClick, texto }) => {
    return (
        <button className="botao-laranja" onClick={onClick}>
            {texto}
        </button>
    );
};

export default Botao;
