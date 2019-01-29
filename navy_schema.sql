CREATE TABLE fleet (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255)
); 

CREATE TABLE ship (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255),
  fleet_id INTEGER REFERENCES fleet(id)
);

CREATE TABLE sailor (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255),
  date_of_birth DATE
);

CREATE TABLE rank (
  id SERIAL PRIMARY KEY,
  name VARCHAR (255)
);

CREATE TABLE assignment (
  id SERIAL PRIMARY KEY,
  start_date DATE,
  end_date DATE,
  sailor_id INTEGER REFERENCES sailor(id),
  rank_id INTEGER REFERENCES rank(id)
);