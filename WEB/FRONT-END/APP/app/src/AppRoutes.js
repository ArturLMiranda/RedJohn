import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./paginas/js/Login";
import Home from "./paginas/js/Home";
import Erro from "./paginas/js/Erro";
import Usuario from "./paginas/js/Usuario";
import Responsaves from "./paginas/js/Responsaves";
import Demandantes from "./paginas/js/Demandantes"


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/Usuario" element={<Usuario />} />
                <Route path="/Responsaves" element={<Responsaves />} />
                <Route path="/Demandantes" element={<Demandantes />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
