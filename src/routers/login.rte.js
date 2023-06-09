import express from 'express';
import { login } from '../controllers/login.ctrl.js';

const loginRouter = express.Router();

loginRouter.post('/auth', login);

export default loginRouter;
