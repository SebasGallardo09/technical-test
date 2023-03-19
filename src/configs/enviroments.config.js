import './dotenv.config.js';

export const portServer = process.env.PORT_SERVER || '3302';
export const hostDB = process.env.HOST_DB || 'localhost';
export const portDB = process.env.PORT_DB || '5432';
export const usernameDB = process.env.USERNAME_DB || 'test';
export const passwordDB = process.env.PASSWORD_DB || 'example';
export const databaseDB = process.env.DATABASE_DB || 'post_technical_test';
export const endpointUser = process.env.ENDPOINT_USER_POST || 'https://jsonplaceholder.typicode.com/posts';
export const endpointPost = process.env.ENDPOINT_POST || 'https://jsonplaceholder.typicode.com/posts';
export const endpointComment = process.env.ENDPOINT_COMMENT || 'https://jsonplaceholder.typicode.com/comments';
export const saltRounds = process.env.SALT_ROUNDS || 10;
export const secretKeyJWT = process.env.SECRET_KEY_JWT || 'sP7dbmMG44dnBL1$yaXJ3DpO19hDlX';
export const tokenExpiredInJWT = process.env.TOKEN_EXPIRED_IN_JWT || 600;
