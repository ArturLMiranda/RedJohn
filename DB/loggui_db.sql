CREATE DATABASE IF NOT EXISTS loggui_db;
USE loggui_db;

CREATE TABLE TipoDeUsuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL
);
CREATE TABLE Status (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL,
    Campo TINYINT(1) NOT NULL -- Armazena booleano (0 = false, 1 = true)
) ;

CREATE TABLE Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL,
    idTipo INT,
    idStatus INT,
    senha VARCHAR(255) NOT NULL, -- Senha criptografada
    FOREIGN KEY (idTipo) REFERENCES TipoDeUsuario(id) ON DELETE SET NULL,
    FOREIGN KEY (idStatus) REFERENCES Status(id) ON DELETE SET NULL
);

CREATE TABLE RegistroLog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    tempo DATETIME NOT NULL,
    fusoHorario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE
) ;


INSERT INTO TipoDeUsuario (nome) VALUES 
('Administrador'),
('Usuário');

INSERT INTO Status (nome, Campo) VALUES 
('Ativo', 1),
('Inativo', 0);