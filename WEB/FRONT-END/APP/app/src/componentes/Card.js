import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './Card.css';
const Card = ({ titulo, demandante, responsavel, descricao, cor }) => {
    return (
        <div className="card">
            <div className="indicador" style={{ backgroundColor: cor }}></div>
            <div className="conteudo">
                <h4>{titulo}</h4>
                <p>Demandante: {demandante}</p>
                <p>Responsável: {responsavel}</p>
                <p>Descrição: {descricao}</p>
            </div>
            <button className="menu-suspenso">
                <BsThreeDotsVertical />
            </button>
        </div>
    );
};

export default Card;
