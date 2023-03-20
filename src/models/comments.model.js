import format from 'pg-format';
import connect from '../configs/connectionDB.config.js';

const insertManyComments = async (posts) => {
    try {
        const query = format('INSERT INTO comments(id, id_post, name_comment, email, body) VALUES %L', posts);
        const resultQuery = await connect.pool.query(query);
        return resultQuery.rowCount;
    } catch (e) {
        console.error(`Error: commentsModel -> insertManyComments -> ${e}`);
        return 0;
    }
};

const getAllCommentsByIdPost = async (idPost) => {
    const query = 'SELECT id, id_post, name_comment, email, body FROM comments WHERE id_post = $1 ORDER BY comments.id DESC';
    const resultQuery = await connect.pool.query(query, [idPost]);
    return resultQuery.rows;
};

export { getAllCommentsByIdPost, insertManyComments };
