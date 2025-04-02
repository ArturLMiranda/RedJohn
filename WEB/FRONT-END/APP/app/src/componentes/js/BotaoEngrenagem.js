import { Button } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa';

const BotaoEngrenagem = ({ onClick }) => {
    return (
        <Button 
            style={{ backgroundColor: '#2F2F31', borderColor: '#2F2F31' }}
            className="botao-config"
            onClick={() => {
                console.log('🔧 Botão de engrenagem clicado!');
                if (onClick) {
                    onClick();
                } else {
                    console.log('⚠️ onClick está indefinido!');
                }
            }}
        >
            <FaCog style={{ color: '#FA7530' }} />
        </Button>
    );
};

export default BotaoEngrenagem;
