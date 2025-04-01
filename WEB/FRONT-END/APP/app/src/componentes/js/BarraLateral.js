import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import '../css/BarraLateral.css';

const BarraLateral = () => {
    const [expandida, setExpandida] = useState(false);
    const [submenuAberto, setSubmenuAberto] = useState(null);
    const navigate = useNavigate(); 
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
                                    <li onClick={() => navigate('/home')}>Demandas</li>
                                    <li onClick={() => navigate('/Erro')}>Erros</li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={() => toggleSubmenu('cadastros')}>
                                Cadastros
                            </button>
                            {submenuAberto === 'cadastros' && (
                                <ul className="submenu">
                                    <li onClick={() => navigate('/Usuario')}>Usuario</li>
                                    <li onClick={() => navigate('/Responsaves')}>Responsaves</li>
                                    <li onClick={() => navigate('/Demandantes')}>Demandantes</li>
                                </ul>
                            )}
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
