import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import BotaoEngrenagem from "./BotaoEngrenagem";

const Linhas = ({ lista=[], onclick,}) => {
    return (
        <>
            {lista.map((lista) => (
                <Card key={lista.id} className="mb-2" style={{ backgroundColor: "#2F2F31", color: "white" }}>
                    <Row className="align-items-center p-2">
                        <Col xs={10}>
                            <span>{lista.nome}</span>
                        </Col>
                        <Col xs={2} className="text-end">
                            <BotaoEngrenagem onClick={onclick} />
                        </Col>
                    </Row>
                </Card>
            ))}
        </>
    );
};

export default Linhas;
