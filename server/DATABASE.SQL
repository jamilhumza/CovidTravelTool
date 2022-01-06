CREATE ROLE admin WITH LOGIN PASSWORD 'your_admin_password';

CREATE DATABASE databasename;

CREATE TABLE countydata(
  id SERIAL PRIMARY KEY,
  county VARCHAR(50),
  cases INT,
  caseDensity FLOAT,
  riskLevel FLOAT,
  date VARCHAR(12)
);
