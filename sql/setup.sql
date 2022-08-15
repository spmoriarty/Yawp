-- Use this file to define your SQL tables
DROP TABLE IF EXISTS users;
-- The SQL in this file will be executed when you run `npm run setup-db`

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

