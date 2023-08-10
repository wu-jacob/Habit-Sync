import * as dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'habit-journal',
  password: process.env.PASSWORD,
  port: 5432,
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getUserById = (request, response) => {
    const user_id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE user_id = $1', [user_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
};

const createUser = (request, response) => {
    const { email, display_name } = request.body
  
    pool.query('INSERT INTO users (email, display_name) VALUES ($1, $2) RETURNING *', [email, display_name], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with user_id: ${results.rows[0].user_id}`)
    })
};

const updateUser = (request, response) => {
    const user_id = request.params.id;
    const { email, display_name } = request.body;
  
    pool.query(
      'UPDATE users SET email = $1, display_name = $2 WHERE user_id = $3',
      [email, display_name, user_id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with user_id: ${user_id}`)
      }
    )
};

const deleteUser = (request, response) => {
    const user_id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE user_id = $1', [user_id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with user_id: ${user_id}`)
    })
};

export {getUsers, getUserById, createUser, updateUser, deleteUser};