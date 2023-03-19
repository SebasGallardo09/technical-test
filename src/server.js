// Imports modules
import express from 'express';
import http from 'http';
import cors from 'cors';
import { portServer } from './configs/enviroments.config.js';
import loginRte from './routers/login.rte.js';
import postRte from './routers/post.rte.js';
import userPostRte from './routers/userPost.rte.js';
import userLoginRte from './routers/userLogin.rte.js';
import initApp from './initials/initApp.js';

// Init Express
const app = express();

// initAllConfiguration

await initApp.initApp();

// Asing Configuration
app.use(cors());
app.use(express.json());

// Import routers
app.use('/login', loginRte);
app.use('/post', postRte);
app.use('/userLogin', userLoginRte);
app.use('/userPost', userPostRte);

http.createServer(app).listen(portServer, () => {
    console.info(`http server listening on port: ${portServer}`);
});

export default app;
