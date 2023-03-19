import express from 'express';
import { validSessionUser } from '../services/jwt.service.js';

import {
    getAllUserLogin, createUserLogin,
    updatePasswordUserLogin, changueEstatusUserLogin,
} from '../controllers/userLogin.ctrl.js';

const userLogin = express.Router();

userLogin.get('/', validSessionUser, getAllUserLogin);
userLogin.post('/', createUserLogin);
userLogin.put('/:id', validSessionUser, updatePasswordUserLogin);
userLogin.put('/status/:id', validSessionUser, changueEstatusUserLogin);

export default userLogin;
