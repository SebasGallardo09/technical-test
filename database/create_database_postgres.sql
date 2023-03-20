-- CREATE DATABASE post_technical_test;

CREATE TABLE IF NOT EXISTS public.user_login(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(45) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_enable BOOL NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_post(
    id INTEGER PRIMARY KEY,
    name_person VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    website VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS post(
    id INTEGER PRIMARY KEY,
    id_user_post INTEGER REFERENCES public.user_post(id),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.comments(
    id INTEGER PRIMARY KEY,
    id_post INTEGER REFERENCES post(id),
    name_comment VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL,
    body TEXT NOT NULL
);