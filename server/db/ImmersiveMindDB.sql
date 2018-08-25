DROP DATABASE IMMERSIVEMIND;
CREATE DATABASE IF NOT EXISTS IMMERSIVEMIND;

USE IMMERSIVEMIND;

CREATE TABLE IF NOT EXISTS CUIDADORES 
(	
	EMAIL_ID VARCHAR(20) NOT NULL,
	PRIMEIRO_NOME VARCHAR(20) NOT NULL,
	ULTIMO_NOME VARCHAR(20) NOT NULL,
	PROFISSAO VARCHAR(20),
	PASSWORD VARCHAR(64) NOT NULL,
	LOGGED_IN BOOL NOT NULL,
	PRIMARY KEY (EMAIL_ID)
);

CREATE TABLE IF NOT EXISTS DOENTES 
(
	DOENTE_ID INT AUTO_INCREMENT, 
	PRIMEIRO_NOME VARCHAR(20) NOT NULL,
	ULTIMO_NOME VARCHAR(20) NOT NULL,
	IDADE VARCHAR(6) NOT NULL,
	OBSERVACAO TEXT,
	EMAIL_ID VARCHAR(20) NOT NULL,
	IMAGEM VARCHAR(60),
	PRIMARY KEY (DOENTE_ID), 
	FOREIGN KEY (EMAIL_ID) REFERENCES CUIDADORES(EMAIL_ID)
);

CREATE TABLE IF NOT EXISTS SESSOES 
(
	SESSAO_ID INT AUTO_INCREMENT, 
	SESSAO_NOME VARCHAR(20),
	EMAIL_ID VARCHAR(20) NOT NULL,
	DOENTE_ID INT,
    DIA DATE NOT NULL,
    IMAGEM VARCHAR(60),
	PRIMARY KEY (SESSAO_ID),
	FOREIGN KEY (DOENTE_ID) REFERENCES DOENTES(DOENTE_ID), 
	FOREIGN KEY (EMAIL_ID) REFERENCES CUIDADORES(EMAIL_ID)
);

CREATE TABLE IF NOT EXISTS CATEGORIAS
(
    CATEGORIA VARCHAR(40) NOT NULL,
    PRIMARY KEY (CATEGORIA)
);

CREATE TABLE IF NOT EXISTS SESSAO_CONTEM_CATEGORIAS
(
    SESSAO_ID INT NOT NULL,
    CATEGORIA VARCHAR(40) NOT NULL,
    FOREIGN KEY (SESSAO_ID) REFERENCES SESSOES(SESSAO_ID),
    FOREIGN KEY (CATEGORIA) REFERENCES CATEGORIAS(CATEGORIA)
);

CREATE TABLE IF NOT EXISTS VIDEOS 
(
	VIDEO_TITLE VARCHAR(100) NOT NULL, -- O titulo do video no Youtube
	CATEGORIA VARCHAR(40) NOT NULL,
    SESSAO_ID INT NOT NULL,
	URL_THUMBNAIL VARCHAR(100) NOT NULL, -- URL onde está localizado o thumbnail
	URL_FILE TEXT NOT NULL, -- URL onde está localizado o ficheiro
    FOREIGN KEY (SESSAO_ID) REFERENCES SESSOES(SESSAO_ID),
	FOREIGN KEY (CATEGORIA) REFERENCES CATEGORIAS(CATEGORIA)
);

CREATE TABLE IF NOT EXISTS VIDEOS_OBSERVACAO 
(
	VIDEO_TITLE VARCHAR(100) NOT NULL,
	EMAIL_ID VARCHAR(20) NOT NULL,
	DOENTE_ID INT NOT NULL,
	SESSAO_ID INT NOT NULL, 
	OBSERVACAO TEXT,
	FOREIGN KEY (DOENTE_ID) REFERENCES DOENTES(DOENTE_ID), 
	FOREIGN KEY (EMAIL_ID) REFERENCES CUIDADORES(EMAIL_ID),
	FOREIGN KEY (SESSAO_ID) REFERENCES SESSOES(SESSAO_ID)
);

/*** DELETE DOS VALORES DAS TABELAS ***/
DELETE FROM VIDEOS_OBSERVACAO;
DELETE FROM VIDEOS;
DELETE FROM SESSAO_CONTEM_CATEGORIAS;
DELETE FROM CATEGORIAS;
DELETE FROM SESSOES;
DELETE FROM DOENTES;
DELETE FROM CUIDADORES;


/*** INSERE OS VALORES NAS TABELAS ***/
INSERT INTO CUIDADORES (EMAIL_ID, PRIMEIRO_NOME, ULTIMO_NOME, PROFISSAO, PASSWORD, LOGGED_IN)
VALUES ('pastel@gmail.com', 'Pastel', _utf8'De Belém', 'Pasteleira', 'pastel', 0);

INSERT INTO DOENTES (PRIMEIRO_NOME, ULTIMO_NOME, IDADE, OBSERVACAO, EMAIL_ID, IMAGEM)
VALUES ('Sardinha', 'Assada', 68, 'Bem assadinhas', 'pastel@gmail.com', 'sardinha.jpg');
INSERT INTO DOENTES (PRIMEIRO_NOME, ULTIMO_NOME, IDADE, OBSERVACAO, EMAIL_ID, IMAGEM)
VALUES ('Ovos', 'Moles', 79, _utf8'Não gosta de ovos duros', 'pastel@gmail.com', 'ovos-moles-aveiro.jpg');
INSERT INTO DOENTES (PRIMEIRO_NOME, ULTIMO_NOME, IDADE, OBSERVACAO, EMAIL_ID, IMAGEM)
VALUES ('Travesseiro', 'de Sintra', 78, 'Vive na Piriquita', 'pastel@gmail.com', 'travesseiro-sintra.jpg');
INSERT INTO DOENTES (PRIMEIRO_NOME, ULTIMO_NOME, IDADE, OBSERVACAO, EMAIL_ID, IMAGEM)
VALUES ('Bola', 'de Berlim', 72, 'Inspirada no doce Berliner', 'pastel@gmail.com', 'berlim.jpg');
INSERT INTO DOENTES (PRIMEIRO_NOME, ULTIMO_NOME, IDADE, OBSERVACAO, EMAIL_ID, IMAGEM)
VALUES (_utf8'Pão', _utf8'de Ló', 60, 'Fofinho e delicioso', 'pastel@gmail.com', _utf8'pão-de-ló.jpg');
INSERT INTO DOENTES (PRIMEIRO_NOME, ULTIMO_NOME, IDADE, OBSERVACAO, EMAIL_ID, IMAGEM)
VALUES ('Arroz', 'Doce', 55, 'Malandrinho', 'pastel@gmail.com', 'arroz-doce.jpg');


INSERT INTO SESSOES (SESSAO_NOME, EMAIL_ID, DOENTE_ID, DIA, IMAGEM)
VALUES (_utf8'Vídeos NatGeo', 'pastel@gmail.com', 3, STR_TO_DATE('25-12-2018', '%d-%m-%Y'), 'nat-geo.png');

INSERT INTO CATEGORIAS (CATEGORIA)
VALUES  ('Animais/Natureza'),
        ('Desporto'),
        ('Locais/Pontos de Interesse'),
        (_utf8'Música');
        
INSERT INTO SESSAO_CONTEM_CATEGORIAS (SESSAO_ID, CATEGORIA)
VALUES (1, 'Animais/Natureza');