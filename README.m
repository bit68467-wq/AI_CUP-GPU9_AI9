# Backend App

Simple Node.js backend with PostgreSQL.

## Stack

- Node.js
- Express
- PostgreSQL
- Deploy on Render

## Endpoints

GET /

GET /users

POST /users
{
 "email":"test@email.com"
}

POST /transactions
{
 "user_id":1,
 "amount":100
}

## Database setup

CREATE TABLE users(
 id SERIAL PRIMARY KEY,
 email TEXT
);

CREATE TABLE transactions(
 id SERIAL PRIMARY KEY,
 user_id INTEGER,
 amount NUMERIC
);
