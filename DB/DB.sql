CREATE DATABASE IF NOT EXISTS sistema_atividades;
USE sistema_atividades;

-- Tabela Demandante
CREATE TABLE demandante (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Tabela Tipo
CREATE TABLE tipo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Tabela Login
CREATE TABLE login_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    senha CHAR(64) NOT NULL -- SHA-256 gera um hash de 64 caracteres
);

-- Tabela Atividade (agora com campo validade)
CREATE TABLE atividade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao TEXT NOT NULL,
    demandante_id INT NOT NULL,
    validade DATE NOT NULL, -- Campo para definir a validade da atividade
    FOREIGN KEY (demandante_id) REFERENCES demandante(id)
);

-- Tabela Responsavel
CREATE TABLE responsavel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Tabela de relacionamento muitos-para-muitos entre Atividade e Responsavel
CREATE TABLE atividade_responsavel (
    atividade_id INT,
    responsavel_id INT,
    PRIMARY KEY (atividade_id, responsavel_id),
    FOREIGN KEY (atividade_id) REFERENCES atividade(id) ON DELETE CASCADE,
    FOREIGN KEY (responsavel_id) REFERENCES responsavel(id) ON DELETE CASCADE
);

-- Tabela Tipo-Login (relação 1 para N)
CREATE TABLE tipo_login (
    tipo_id INT,
    login_id INT,
    PRIMARY KEY (tipo_id, login_id),
    FOREIGN KEY (tipo_id) REFERENCES tipo(id) ON DELETE CASCADE,
    FOREIGN KEY (login_id) REFERENCES login_usuario(id) ON DELETE CASCADE
);
