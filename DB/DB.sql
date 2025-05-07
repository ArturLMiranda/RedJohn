-- Criação e uso do banco de dados
CREATE DATABASE IF NOT EXISTS sistema_atividades;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'Onex@2024';
GRANT ALL PRIVILEGES ON nome_do_banco.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
USE sistema_atividades;

-- Tabela Demandante
CREATE TABLE IF NOT EXISTS demandante (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Tabela Tipo (tipo de usuário)
CREATE TABLE IF NOT EXISTS tipo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Tabela LoginUsuario
CREATE TABLE IF NOT EXISTS login_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    senha CHAR(64) NOT NULL, -- SHA-256 gera um hash de 64 caracteres
    tipo INT NOT NULL,
    FOREIGN KEY (tipo) REFERENCES tipo(id) ON DELETE CASCADE
);

-- Tabela Status com coluna de cor
CREATE TABLE IF NOT EXISTS status (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    cor VARCHAR(7) -- Códigos hexadecimais de cor (ex: #33A1FF)
);

-- Tabela Responsável
CREATE TABLE IF NOT EXISTS responsavel (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL
);

-- Tabela Atividade
CREATE TABLE IF NOT EXISTS atividade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    demandante_id INT NOT NULL,
    validade DATE NOT NULL,
    status_id INT,
    FOREIGN KEY (demandante_id) REFERENCES demandante(id),
    FOREIGN KEY (status_id) REFERENCES status(id)
    -- responsavel_id REMOVIDO (era incorreto com M2M)
);

-- Tabela de relacionamento muitos-para-muitos entre Atividade e Responsável
CREATE TABLE IF NOT EXISTS atividade_responsavel (
    atividade_id INT,
    responsavel_id INT,
    PRIMARY KEY (atividade_id, responsavel_id),
    FOREIGN KEY (atividade_id) REFERENCES atividade(id) ON DELETE CASCADE,
    FOREIGN KEY (responsavel_id) REFERENCES responsavel(id) ON DELETE CASCADE
);

-- Inserção dos tipos de usuário
INSERT INTO tipo (nome) VALUES
('Admin'),
('User'),
('Guest');

-- Inserção do admin
INSERT INTO login_usuario (nome, senha, tipo)
VALUES ('Admin', SHA2('admin', 256), 1);

-- Inserção dos status com cores
INSERT INTO status (nome, cor) VALUES
('Aguardando', '#33A1FF'),   -- Azul
('Em andamento', '#FFCC00'), -- Amarelo
('Resolvido', '#33FF57'),    -- Verde
('Erro', '#FF3399');         -- Vermelho
