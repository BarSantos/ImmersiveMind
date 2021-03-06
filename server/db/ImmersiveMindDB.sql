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
	SESSAO_NOME VARCHAR(60),
	EMAIL_ID VARCHAR(20) NOT NULL,
	DOENTE_ID INT,
    DIA DATE ,
    IMAGEM VARCHAR(60),
    TERMINADO BOOL NOT NULL,
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
	CATEGORIA VARCHAR(40),
    SESSAO_ID INT,
	URL_THUMBNAIL VARCHAR(100) NOT NULL, -- URL onde está localizado o thumbnail
	URL_FILE TEXT NOT NULL, -- URL onde está localizado o ficheiro
    FOREIGN KEY (SESSAO_ID) REFERENCES SESSOES(SESSAO_ID),
	FOREIGN KEY (CATEGORIA) REFERENCES CATEGORIAS(CATEGORIA)
);

CREATE TABLE IF NOT EXISTS OBSERVACOES 
(
	SESSAO_ID INT NOT NULL,
    TEMPO INT NOT NULL, -- tempo que demora a sessão
    RECONHECIMENTO INT NOT NULL,
    HUMOR INT NOT NULL,
    INTERESSE INT NOT NULL,
    INTERACCAO INT NOT NULL,
    NAUSEAS BOOL NOT NULL,
    DESEQUILIBRIOS BOOL NOT NULL,
    PERTURBACOES_VISUAIS TEXT NOT NULL,
    OBSERVACOES TEXT,
    FOREIGN KEY (SESSAO_ID) REFERENCES SESSOES(SESSAO_ID)
);

/*** DELETE DOS VALORES DAS TABELAS ***/
DELETE FROM OBSERVACOES;
DELETE FROM VIDEOS;
DELETE FROM SESSAO_CONTEM_CATEGORIAS;
DELETE FROM CATEGORIAS;
DELETE FROM SESSOES;
DELETE FROM DOENTES;
DELETE FROM CUIDADORES;


/*** INSERE OS VALORES NAS TABELAS ***/
INSERT INTO CUIDADORES (EMAIL_ID, PRIMEIRO_NOME, ULTIMO_NOME, PROFISSAO, PASSWORD, LOGGED_IN)
VALUES ('pastel@gmail.com', 'Pastel', _utf8'De Belém', 'Pasteleira', SHA2('pastel', 256), 0);

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


INSERT INTO SESSOES (SESSAO_NOME, EMAIL_ID, DOENTE_ID, DIA, IMAGEM, TERMINADO)
VALUES (_utf8'Vídeos NatGeo', 'pastel@gmail.com', 3, STR_TO_DATE('25-12-2018', '%d-%m-%Y'), 'nat-geo.png', 0);

INSERT INTO SESSOES (SESSAO_NOME, EMAIL_ID, DOENTE_ID, DIA, IMAGEM, TERMINADO)
VALUES ('Gatinhos Lindos', 'pastel@gmail.com', 5, STR_TO_DATE('01-12-2018', '%d-%m-%Y'), 'nat-geo.png', 0);

INSERT INTO CATEGORIAS (CATEGORIA)
VALUES  ('Animais/Natureza'),
        ('Desporto'),
        ('Locais/Pontos de Interesse'),
        (_utf8'Música');
        
INSERT INTO SESSAO_CONTEM_CATEGORIAS (SESSAO_ID, CATEGORIA)
VALUES (1, _utf8'Música');

INSERT INTO SESSAO_CONTEM_CATEGORIAS (SESSAO_ID, CATEGORIA)
VALUES (1, 'Animais/Natureza');

INSERT INTO SESSAO_CONTEM_CATEGORIAS (SESSAO_ID, CATEGORIA)
VALUES (1, 'Locais/Pontos de Interesse');

INSERT INTO SESSAO_CONTEM_CATEGORIAS (SESSAO_ID, CATEGORIA)
VALUES (2, 'Animais/Natureza');

/************************* ANIMAIS ********************/

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES (_utf8'Lions 360° | National Geographic', 'Animais/Natureza', 'https://i.ytimg.com/vi/sPyAQQklc1s/maxresdefault.jpg', 'https://www.youtube.com/watch?v=sPyAQQklc1s');

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES (_utf8'Wild Dolphins VR / 360° Video Experience', 'Animais/Natureza', 'https://i.ytimg.com/vi/BbT_e8lWWdo/maxresdefault.jpg', 'https://www.youtube.com/watch?v=BbT_e8lWWdo');


INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES ('Funny meerkats playing in the desert 360 video | Animals with Cameras | Earth Unplugged', 'Animais/Natureza', 'https://i.ytimg.com/vi/VUMu8EQ1Ang/maxresdefault.jpg', 'https://www.youtube.com/watch?v=VUMu8EQ1Ang');


INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES (_utf8'ADORABLE Puppy Guide Dogs In 360° | Earth Unplugged', 'Animais/Natureza', 'https://i.ytimg.com/vi/5qmmms4VP2k/maxresdefault.jpg', 'https://www.youtube.com/watch?v=5qmmms4VP2k');

/************************* DESPORTO ********************/

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES ('Real Madrid vs. Juventus | 2017 Champions League Final | 360 VIdeo | FOX SOCCER', 'Desporto', 'https://i.ytimg.com/vi/JTWdUBIvOFY/maxresdefault.jpg', 'https://www.youtube.com/watch?v=JTWdUBIvOFY');

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES ('NBA 360 | Kobe Bryant\'s Last Game', 'Desporto', 'https://i.ytimg.com/vi/ydBKIXWXxsk/maxresdefault.jpg', 'https://www.youtube.com/watch?v=ydBKIXWXxsk');

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES ('F1 Live London In 360 | Sebastian Vettel And Ferrari', 'Desporto', 'https://i.ytimg.com/vi/fQoVFraBOnc/maxresdefault.jpg', 'https://www.youtube.com/watch?v=fQoVFraBOnc');

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES (_utf8'Extreme Sports VR / 360° Video Experience', 'Desporto', 'https://i.ytimg.com/vi/m9pbCzUPmY8/maxresdefault.jpg', 'https://www.youtube.com/watch?v=m9pbCzUPmY8');

/************************* MÚSICA ********************/

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES ('Big Music in Small Rooms: Fado | The Daily 360 | The New York Times', _utf8'Música', 'https://i.ytimg.com/vi/W94dS-QxpaQ/maxresdefault.jpg', 'https://www.youtube.com/watch?v=W94dS-QxpaQ');

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES ('BBC Concert Orchestra - Theme from Jaws introduced by Mark Kermode', _utf8'Música', 'https://i.ytimg.com/vi/psuEn5HQUOA/maxresdefault.jpg', 'https://www.youtube.com/watch?v=psuEn5HQUOA');

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES ('Carnegie Hall 360 Video featuring The Philadelphia Orchestra', _utf8'Música', 'https://i.ytimg.com/vi/YERHP5wp_zw/maxresdefault.jpg', 'https://www.youtube.com/watch?v=YERHP5wp_zw');

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES ('(360 VIDEO) Brazilian street music, live from the metro', _utf8'Música', 'https://i.ytimg.com/vi/be5R6N7rIBs/maxresdefault.jpg', 'https://www.youtube.com/watch?v=be5R6N7rIBs');


/************************* LOCAIS/PONTOS DE INTERESSE ********************/

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES (_utf8'360°, Lisbon, Portugal, 5K aerial video', 'Locais/Pontos de Interesse', 'https://i.ytimg.com/vi/YCEypD3gOkM/maxresdefault.jpg', 'https://www.youtube.com/watch?v=YCEypD3gOkM');

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES ('Lisbon in 360', 'Locais/Pontos de Interesse', 'https://i.ytimg.com/vi/G353z19p2dM/maxresdefault.jpg', 'https://www.youtube.com/watch?v=G353z19p2dM');

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES (_utf8'360°, Porto, Portugal. 5,6K aerial video', 'Locais/Pontos de Interesse', 'https://i.ytimg.com/vi/2KaD5Wf9Kro/maxresdefault.jpg', 'https://www.youtube.com/watch?v=2KaD5Wf9Kro');

INSERT INTO VIDEOS (VIDEO_TITLE, CATEGORIA, URL_THUMBNAIL, URL_FILE) 
VALUES (_utf8'ALGARVE 360º - GENÉRICO', 'Locais/Pontos de Interesse', 'https://i.ytimg.com/vi/pooEMj3gYFo/maxresdefault.jpg', 'https://www.youtube.com/watch?v=pooEMj3gYFo');

/******************* OBSERVACOES ***********************/

INSERT INTO OBSERVACOES (SESSAO_ID, TEMPO, RECONHECIMENTO, HUMOR, INTERESSE, INTERACCAO, NAUSEAS, DESEQUILIBRIOS, PERTURBACOES_VISUAIS, OBSERVACOES)
VALUES (1, 900, 4, 5, 4, 5, 0, 0, 'Nada', 'Meh');

INSERT INTO OBSERVACOES (SESSAO_ID, TEMPO, RECONHECIMENTO, HUMOR, INTERESSE, INTERACCAO, NAUSEAS, DESEQUILIBRIOS, PERTURBACOES_VISUAIS, OBSERVACOES)
VALUES (2, 900, 4, 5, 4, 5, 0, 0, 'Nada', _utf8'Gostou especialmente do vídeo com gatinhos bebés!');
