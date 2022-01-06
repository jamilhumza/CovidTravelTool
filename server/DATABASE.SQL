CREATE DATABASE coviddata;

CREATE TABLE countydata(
  id SERIAL PRIMARY KEY,
  county VARCHAR(50),
  cases INT,
  caseDensity FLOAT,
  riskLevel FLOAT,
  date VARCHAR(12)
);