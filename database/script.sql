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
   id_place	INT,
   place	VARCHAR(100)	NOT NULL,
   PRIMARY KEY(id_place)
);

--DROP TABLE sys_photovoltaic;
CREATE TABLE sys_photovoltaic(
   id_sys_foto	SERIAL,
   place_id	INT REFERENCES places(id_place) ON UPDATE NO ACTION ON DELETE CASCADE,
   date_time	TIMESTAMP,
   kw_produced DECIMAL,
   kw_consumed DECIMAL,
   radiation	DECIMAL,
   PRIMARY KEY(id_sys_foto)
);

--DROP TABLE sys_thermal;
CREATE TABLE sys_thermal(
   id_sys_term	SERIAL,
   place_id	INT REFERENCES places(id_place) ON UPDATE NO ACTION ON DELETE CASCADE,
   date_time	TIMESTAMP,
   sensor1 DECIMAL,
   sensor2 DECIMAL,
   sensor3 DECIMAL,
   PRIMARY KEY(id_sys_term)
);

INSERT INTO users(usern,passw,fullname) VALUES ('alopez','AndresLM123','Andrés López M'),
							('gcastro','GuilleCast','Guillermo Castro'),
							('tguzman','TomGuzm','Tomas Gúzman');

INSERT INTO places(id_place,place) VALUES (1,'Lecheria'),
						  (2,'C-Tec'),
						  (3,'San Bosco'),
                    (4,'Allafark');
SELECT * FROM users; 
SELECT * FROM places; 
SELECT * FROM sys_photovoltaic;
SELECT * FROM sys_thermal;  
SELECT CURRENT_TIME;		