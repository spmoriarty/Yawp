-- Use this file to define your SQL tables
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS eatery;
-- The SQL in this file will be executed when you run `npm run setup-db`

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);


CREATE TABLE eatery (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    address VARCHAR NOT NULL
);

INSERT INTO eatery VALUES
('Taco Bell', 'Portland', '123 Gassy Lane'),
('McDonalds', 'Gresham', '456 McHappy St'),
('Wendys', 'Oswego', '789 Distastefull Rd.')