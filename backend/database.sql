CREATE DATABASE DB;

CREATE TABLE clusters (id SERIAL PRIMARY KEY,name VARCHAR(255) UNIQUE,config VARCHAR(255) UNIQUE);
