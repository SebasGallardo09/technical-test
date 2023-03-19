import format from 'pg-format';
import connect from '../configs/connectionDB.config.js';

const getAllUser = async () => {
    const resultQuery = await connect.pool.query('SELECT id FROM user_post ORDER BY id DESC');
    return resultQuery.rows;
};

const insertManyUsers = async (users) => {
    try {
        const query = format('INSERT INTO user_post(id, name_person, email, website) VALUES %L', users);
        const resultQuery = await connect.pool.query(query);
        return resultQuery.rowCount;
    } catch (e) {
        console.error(`Error: userPostModel -> insertManyUsers -> ${e}`);
        return 0;
    }
};

export { getAllUser, insertManyUsers };
