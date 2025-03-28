import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalNovaDemanda = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nova Demanda</Modal.Title>
            </Modal.Header>
            <Modal.Body>Formulário de Nova Demanda</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                <Button variant="primary">Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalNovaDemanda;
