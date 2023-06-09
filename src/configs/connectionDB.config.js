import pg from 'pg';
import {
    hostDB, portDB, usernameDB, passwordDB, databaseDB, connectionTimeoutMillis, idleTimeoutMillis, maxConnections,
} from './enviroments.config.js';

const connectionData = {
    user: usernameDB,
    host: hostDB,
    port: portDB,
    database: databaseDB,
    password: passwordDB,
    max: maxConnections,
    idleTimeoutMillis,
    connectionTimeoutMillis,
};
const pool = new pg.Pool(connectionData);

pool.on('connect', (client) => {
    console.info(`Connection to host: ${hostDB}, port: ${portDB}, database: ${databaseDB}, user: ${usernameDB}`);
    client.query('SET DATESTYLE = iso, mdy');
});

pool.on('error', (err) => {
    console.error(`Fail connection ${err}`);
});

export default { pool };
