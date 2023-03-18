import connect from '../configs/connectionDB.config.js';

const getAllUserPost = async () => {
    const resultQuery = await connect.pool.query('SELECT * FROM user_post ORDER BY id DESC');
    return resultQuery.rows;
};

const getUserById = () => ('');

export { getAllUserPost, getUserById };
