import express from 'express';
import {
    getAllUserLogin, createUserLogin,
    updatePasswordUserLogin, changueEstatusUserLogin,
} from '../controllers/userLogin.ctrl.js';

const userLogin = express.Router();

userLogin.get('/', getAllUserLogin);
userLogin.post('/', createUserLogin);
userLogin.put('/:id', updatePasswordUserLogin);
userLogin.put('/status/:id', changueEstatusUserLogin);

export default userLogin;
