import connect from '../configs/connectionDB.config.js';
import { encryptText } from '../services/bcrypt.service.js';
import validData from '../utilis/validData.js';

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

const validUserAndPassword = async (username) => {
    const query = 'SELECT id, user_name, user_enable, user_password FROM user_login WHERE user_name = $1 ORDER BY id DESC';
    const resultQuery = await connect.pool.query(query, [username]);
    return resultQuery.rows;
};

const createUser = async (objectUser) => {
    try {
        if (validData.isBlank(objectUser.username) || validData.isBlank(objectUser.password)) throw Error('Data not fount');
        const query = 'INSERT INTO user_login(user_enable, user_name, user_password) VALUES ($1, $2, $3)';
        await connect.pool.query(query, [true, objectUser.username, encryptText(objectUser.password)]);
        return true;
    } catch (e) {
        return false;
    }
};

const updateUserLoginPassword = async (id, password) => {
    try {
        if (validData.isBlank(id) || validData.isBlank(password)) throw Error('Data not fount');
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
