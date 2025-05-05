import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import BotaoEngrenagem from "./BotaoEngrenagem";

const LinhasUsuarios = ({ lista = [], onClick }) => { 
    return (
        <>
            {lista.map((usuario) => (
                <Card key={usuario.id} className="mb-2" style={{ backgroundColor: "#2F2F31", color: "white" }}>
                    <Row className="align-items-center p-2">
                        <Col xs={5}>
                            <span>{usuario.nome}</span>
                        </Col>
                        <Col xs={5}>
                            <span>{usuario.tipo?.nome || 'Sem tipo'}</span>
                        </Col>
                        <Col xs={2} className="text-end">
                            <BotaoEngrenagem onClick={() => onClick(usuario)} />
                        </Col>
                    </Row>
                </Card>
            ))}
        </>
    );
};

export default LinhasUsuarios;