import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import '../css/BarraLateral.css';

const BarraLateral = () => {
    const [expandida, setExpandida] = useState(false);
    const [submenuAberto, setSubmenuAberto] = useState(null);

    const toggleExpandir = () => setExpandida(!expandida);
    const toggleSubmenu = (menu) =>
        setSubmenuAberto(submenuAberto === menu ? null : menu);

    return (
        <div className={`barra-lateral ${expandida ? 'expandida' : ''}`}>
            <button className="botao-menu" onClick={toggleExpandir}>
                <FaBars />
            </button>

            {expandida && (
                <nav>
                    <ul>
                        <li>
                            <button onClick={() => toggleSubmenu('monitoramento')}>
                                Monitoramento
                            </button>
                            {submenuAberto === 'monitoramento' && (
                                <ul className="submenu">
                                    <li>Demandas</li>
                                    <li>Erros</li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={() => toggleSubmenu('cadastros')}>
                                Cadastros
                            </button>
                        </li>
                        <li>
                            <button onClick={() => toggleSubmenu('configuracao')}>
                                Configuração
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default BarraLateral;
