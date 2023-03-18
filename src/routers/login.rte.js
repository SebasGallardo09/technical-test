import express from 'express';
import { login, logoff } from '../controllers/login.js';

const loginRouter = express.Router();

loginRouter.post('/auth', login);
loginRouter.post('/logoff', logoff);

export default loginRouter;
