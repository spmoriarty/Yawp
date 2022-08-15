-- Use this file to define your SQL tables
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS eatery CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
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

CREATE table reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT,
  eatery_id BIGINT,
  review VARCHAR,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (eatery_id) REFERENCES eatery(id)
);

INSERT INTO eatery (name, city, address) VALUES
('Taco Bell', 'Portland', '123 Gassy Lane'),
('McDonalds', 'Gresham', '456 McHappy St'),
('Wendys', 'Oswego', '789 Distastefull Rd');

INSERT INTO users (first_name, last_name, email, password_hash) VALUES
('Paul', 'Porter', 'paulPorter@porter.com', '12345');

INSERT INTO reviews (user_id, eatery_id, review) VALUES 
(1, 1, 'Could be better'),
(1, 1, 'Could be Worse'),
(1, 2, 'Lets go Egg McMuffin'),
(1, 3, 'Square burgers are a joke'),
(1, 1, 'Only place to still get gas for under 5$'),
(1, 1, 'Bring back the choco taco');