CREATE DATABASE Video;
USE Video;

-- Criar a tabela Protocolo
CREATE TABLE Protocolo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL,
    porta INT NOT NULL
);

-- Criar a tabela Deskboard
CREATE TABLE Deskboard (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL
);

-- Criar a tabela DVinteracao (Relaciona Deskboard e Video)
CREATE TABLE DVinteracao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idDeskboard INT,
    idVideo INT,
    FOREIGN KEY (idDeskboard) REFERENCES Deskboard(id),
    FOREIGN KEY (idVideo) REFERENCES Video(id)
);

-- Criar a tabela Camera
CREATE TABLE Camera (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL,
    descricao TEXT
);

-- Criar a tabela Foto
CREATE TABLE Foto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    arquivo VARCHAR(255) NOT NULL
);

-- Criar a tabela Pessoa
CREATE TABLE Pessoa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL,
    idFoto INT,
    FOREIGN KEY (idFoto) REFERENCES Foto(id)
);

-- Criar a tabela Video
CREATE TABLE Video (
    id INT PRIMARY KEY AUTO_INCREMENT,
    local VARCHAR(255) NOT NULL,
    idCamera INT,
    idProtocolo INT DEFAULT NULL,
    porta INT DEFAULT NULL,
    FOREIGN KEY (idCamera) REFERENCES Camera(id),
    FOREIGN KEY (idProtocolo) REFERENCES Protocolo(id)
);

-- Criar a tabela Registro
CREATE TABLE Registro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idVideo INT,
    idPessoa INT,
    tempo DATETIME NOT NULL,
    FOREIGN KEY (idVideo) REFERENCES Video(id),
    FOREIGN KEY (idPessoa) REFERENCES Pessoa(id)
);
INSERT INTO Protocolo (nome, porta) VALUES
('HTTP', 80),
('HTTPS', 443),
('FTP', 21),
('SSH', 22),
('SMTP', 25),
('DNS', 53);