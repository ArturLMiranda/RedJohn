import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import './BarraLateral.css';

const BarraLateral = () => {
    const [expandida, setExpandida] = useState(false);

    return (
        <div className={`barra-lateral ${expandida ? 'expandida' : ''}`}>
            <button className="botao-menu" onClick={() => setExpandida(!expandida)}>
                <FaBars />
            </button>
            {expandida && <nav>Opções do Menu</nav>}
        </div>
    );
};

export default BarraLateral;
