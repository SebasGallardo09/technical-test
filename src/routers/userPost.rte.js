import express from 'express';
import { getAllUserPostCtrl } from '../controllers/userPost.ctrl.js';

const userPostRouter = express.Router();

userPostRouter.get('/', getAllUserPostCtrl);

export default userPostRouter;
