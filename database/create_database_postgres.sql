-- CREATE DATABASE post_technical_test;

CREATE TABLE IF NOT EXISTS public.user_login(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(45) UNIQUE,
    user_password VARCHAR(255),
    user_enable BOOL
);

CREATE TABLE IF NOT EXISTS user_post(
    id INTEGER PRIMARY KEY,
    name_person VARCHAR(150),
    email VARCHAR(150),
    website VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS post(
    id INTEGER PRIMARY KEY,
    id_user_post INTEGER REFERENCES user_post(id),
    title VARCHAR(255),
    body TEXT
);

CREATE TABLE IF NOT EXISTS comments(
    id INTEGER PRIMARY KEY,
    id_post INTEGER REFERENCES post(id),
    name_comment VARCHAR(255),
    email VARCHAR(150),
    body TEXT
);