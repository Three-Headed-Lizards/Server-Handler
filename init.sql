CREATE EXTENSION pgcrypto;

CREATE TABLE users ( userID serial primary key, username varchar(40) not null unique, firstname varchar(40) not null, lastname varchar(40) not null, email varchar(40) not null unique, password text not null);

CREATE TABLE game (
userID int not null,
username varchar(40) not null,
timestamp varchar(40) not null,
tagtime int not null);

INSERT INTO users 
  (username, 
   firstname, 
   lastname, 
   email, 
   password) 
  values 
  ('testuser', 
   'test', 
   'user', 
   'testemail@test.com', 
   crypt('example_password', gen_salt('bf')));
