import format from 'pg-format';
import connect from '../configs/connectionDB.config.js';

const getAllIdPost = async () => {
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

const getAllPost = async () => {
    let query = 'SELECT post.id, post.title, post.body, user_post.name_person, user_post.website, user_post.email FROM post ';
    query += 'INNER JOIN user_post ON user_post.id = post.id_user_post ';
    query += 'ORDER BY post.id DESC';
    const resultQuery = await connect.pool.query(query);
    return resultQuery.rows;
};

export { getAllIdPost, insertManyPost, getAllPost };
