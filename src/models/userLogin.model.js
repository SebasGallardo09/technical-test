import connect from '../configs/connectionDB.config.js';
import { encryptText } from '../services/bcrypt.service.js';

const getAllUsers = async () => {
    const query = 'SELECT id, user_name, user_enable FROM user_login ORDER BY id DESC';
    const resultQuery = await connect.pool.query(query);
    return resultQuery.rows;
};

const getUserLoginById = async (id) => {
    const query = 'SELECT id, user_name, user_enable FROM user_login WHERE id = $1 ORDER BY id DESC';
    const resultQuery = await connect.pool.query(query, [id]);
    return resultQuery.rows;
};

const getUserLoginByUsername = async (username) => {
    const query = 'SELECT user_name, user_enable FROM user_login WHERE user_name = $1 ORDER BY id DESC';
    const resultQuery = await connect.pool.query(query, [username]);
    return resultQuery.rows;
};

const validUserAndPassword = async (username, password) => {
    const query = 'SELECT id, user_name, user_enable FROM user_login WHERE user_name = $1 AND user_password = $1 ORDER BY id DESC';
    const resultQuery = await connect.pool.query(query, [username, password]);
    return resultQuery.rows;
};

const createUser = async (objectUser) => {
    const query = 'INSERT INTO user_login(user_enable, user_name, user_password) VALUES ($1, $2, $3)';
    const resultQuery = await connect.pool.query(query, [true, objectUser.username, encryptText(objectUser.password)]);
    return resultQuery.rows;
};

const updateUserLoginPassword = async (id, password) => {
    try {
        const query = 'UPDATE user_login SET user_password = $1 WHERE id = $2';
        await connect.pool.query(query, [encryptText(password), id]);
        return true;
    } catch (e) {
        console.error(`Error: userLoginModel -> updateUserLoginPassword -> ${e}`);
        return false;
    }
};

const updateUserLoginEstatus = async (id, estatus) => {
    try {
        const query = 'UPDATE user_login SET user_enable = $1 WHERE id = $2 ';
        await connect.pool.query(query, [estatus, id]);
        return true;
    } catch (e) {
        console.error(`Error: userLoginModel -> updateUserLoginEstatus -> ${e}`);
        return false;
    }
};

export {
    getAllUsers,
    getUserLoginById,
    getUserLoginByUsername,
    validUserAndPassword,
    createUser,
    updateUserLoginPassword,
    updateUserLoginEstatus,
};
