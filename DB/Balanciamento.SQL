CREATE DATABASE Balanciamento;
USE Balanciamento;

CREATE TABLE Protocolo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL,
    porta INT NOT NULL
);

CREATE TABLE Balanceamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL,
    ip VARCHAR(18) NOT NULL,
    idProtocolo INT,
    FOREIGN KEY (idProtocolo) REFERENCES Protocolo(id)
);

CREATE TABLE Agente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL,
    ip VARCHAR(18) NOT NULL,
    idProtocolo INT,
    idBalanceamento INT,
    FOREIGN KEY (idProtocolo) REFERENCES Protocolo(id),
    FOREIGN KEY (idBalanceamento) REFERENCES Balanceamento(id)
);
INSERT INTO Protocolo (nome, porta) VALUES
('HTTP', 80),
('HTTPS', 443),
('FTP', 21),
('SSH', 22),
('SMTP', 25),
('DNS', 53);