--DROP DATABASE dbAsistElectro;
CREATE DATABASE dbAsistElectro;

--DROP TABLE users;
CREATE TABLE users(
   usern		VARCHAR(25),
   passw		VARCHAR(25),
   fullname	VARCHAR(50)	NOT NULL,
   PRIMARY KEY(usern)
);

--DROP TABLE places;
CREATE TABLE places(
   id_place	SERIAL,
   place	VARCHAR(100)	NOT NULL UNIQUE,
   PRIMARY KEY(id_place)
);

--DROP TABLE sys_photovoltaic;
CREATE TABLE sys_photovoltaic(
   id_sys_foto	SERIAL,
   place_id	INT REFERENCES places(id_place) ON UPDATE NO ACTION ON DELETE NO ACTION,
   date_time	TIMESTAMP  UNIQUE,
   kw_produced DECIMAL,
   kw_consumed DECIMAL,
   radiation	DECIMAL,
   PRIMARY KEY(id_sys_foto)
);

--DROP TABLE sys_photovoltaic_config;
CREATE TABLE sys_photovoltaic_config(
   id_sys_foto_config SERIAL,
   sys_description VARCHAR(100) NOT NULL,
   place_id INT REFERENCES places(id_place) ON UPDATE NO ACTION ON DELETE NO ACTION,
   sys_number  INT NOT NULL UNIQUE,
   sys_user VARCHAR(100) NOT NULL UNIQUE,
   sys_key VARCHAR(100) NOT NULL UNIQUE,
   PRIMARY KEY(id_sys_foto_config)
);

--DROP TABLE sys_thermal;
CREATE TABLE sys_thermal(
   id_sys_term	SERIAL,
   place_id	INT REFERENCES places(id_place) ON UPDATE NO ACTION ON DELETE NO ACTION,
   date_time	TIMESTAMP UNIQUE,
   sensor1 DECIMAL,
   sensor2 DECIMAL,
   sensor3 DECIMAL,
   PRIMARY KEY(id_sys_term)
);

--DROP TABLE sys_thermal_config;
CREATE TABLE sys_thermal_config(
   id_sys_term_config SERIAL,
   sys_description VARCHAR(100) NOT NULL,
   place_id INT REFERENCES places(id_place) ON UPDATE NO ACTION ON DELETE NO ACTION,
   sys_url  INT NOT NULL UNIQUE,
   sys_user VARCHAR(100) NOT NULL,
   sys_pass VARCHAR(100) NOT NULL,
   PRIMARY KEY(id_sys_term_config)
);

INSERT INTO users(usern,passw,fullname) VALUES 
   ('alopez','AndresLM123','Andrés López M'),
	('gcastro','GuilleCast','Guillermo Castro'),
	('tguzman','TomGuzm','Tomas Gúzman');
   ('admin','adminPass2016','Administrador');

INSERT INTO places(id_place,place) VALUES ('Lecheria'),('C-Tec'),('San Bosco'),('llafrak');
