import format from 'pg-format';
import connect from '../configs/connectionDB.config.js';

const getAllPost = async () => {
    const resultQuery = await connect.pool.query('SELECT id FROM post ORDER BY id DESC');
    return resultQuery.rows;
};

const insertManyPost = async (posts) => {
    try {
        const query = format('INSERT INTO post(id, id_user_post, title, body) VALUES %L', posts);
        const resultQuery = await connect.pool.query(query);
        return resultQuery.rowCount;
    } catch (e) {
        console.error(`Error: postModel -> insertManyPost -> ${e}`);
        return 0;
    }
};

export { getAllPost, insertManyPost };
