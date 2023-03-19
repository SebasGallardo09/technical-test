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

export default { insertManyComments };
