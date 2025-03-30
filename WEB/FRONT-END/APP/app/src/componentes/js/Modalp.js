import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../css/Modal.css';
const Modalp = ({ show, handleClose, children }) => {
    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            size="lg"  // Tamanho grande para o modal
            centered   // Para centralizar o modal na tela
        >
            <Modal.Header closeButton style={{ backgroundColor: '#2F2F31', color: 'white' }}>
                <Modal.Title>Nova Demanda</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#2F2F31', color: 'white' }}>
                {children}
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#2F2F31', color: 'white' }}>
                <Button variant="secondary" onClick={handleClose}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Modalp;

