-- Criação e uso do banco de dados
CREATE DATABASE IF NOT EXISTS sistema_atividades;
USE sistema_atividades;

-- Tabela Demandante
CREATE TABLE demandante (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Tabela Tipo (tipo de usuário)
CREATE TABLE tipo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Tabela LoginUsuario
CREATE TABLE login_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    senha CHAR(64) NOT NULL -- SHA-256 gera um hash de 64 caracteres
);

-- Tabela de associação entre Tipo e LoginUsuario (1:N)
CREATE TABLE tipo_login (
    tipo_id INT,
    login_id INT,
    PRIMARY KEY (tipo_id, login_id),
    FOREIGN KEY (tipo_id) REFERENCES tipo(id) ON DELETE CASCADE,
    FOREIGN KEY (login_id) REFERENCES login_usuario(id) ON DELETE CASCADE
);

-- Tabela Status com coluna de cor
CREATE TABLE status (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    cor VARCHAR(7) -- Códigos hexadecimais de cor (ex: #33A1FF)
);

-- Tabela Atividade
CREATE TABLE atividade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao TEXT NOT NULL,
    demandante_id INT NOT NULL,
    validade DATE NOT NULL,
    status_id INT,
    FOREIGN KEY (demandante_id) REFERENCES demandante(id),
    FOREIGN KEY (status_id) REFERENCES status(id)
);

-- Tabela Responsável
CREATE TABLE responsavel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Tabela de relacionamento muitos-para-muitos entre Atividade e Responsável
CREATE TABLE atividade_responsavel (
    atividade_id INT,
    responsavel_id INT,
    PRIMARY KEY (atividade_id, responsavel_id),
    FOREIGN KEY (atividade_id) REFERENCES atividade(id) ON DELETE CASCADE,
    FOREIGN KEY (responsavel_id) REFERENCES responsavel(id) ON DELETE CASCADE
);

-- Inserção dos tipos de usuário
INSERT INTO tipo (nome) VALUES ('admin'), ('user');

-- Inserção dos status com cores
INSERT INTO status (nome, cor) VALUES
('aguardando', '#33A1FF'),   -- Azul
('em_andamento', '#FFCC00'), -- Amarelo
('resolvido', '#33FF57'),    -- Verde
('erro', '#FF3399');         -- Vermelho
