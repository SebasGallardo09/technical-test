// Imports modules
import express from 'express';
import http from 'http';
import cors from 'cors';
import { portServer } from './configs/enviroments.config.js';
import loginRte from './routers/login.rte.js';
import postRte from './routers/post.rte.js';

// Init Express
const app = express();

// Asing Configuration
app.use(cors());
app.use(express.json());

// Import routers
app.use('/login', loginRte);
app.use('/post', postRte);

http.createServer(app).listen(portServer, () => {
    console.info(`http server listening on port: ${portServer}`);
});

export default app;
