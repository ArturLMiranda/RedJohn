import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./paginas/js/Login";
import Home from "./paginas/js/Home";
import Erro from "./paginas/js/Erro"

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/Erro" element={<Erro />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
