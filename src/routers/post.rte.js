import express from 'express';
import { getAllPostWhitComments } from '../controllers/post.ctrl.js';
import { validSessionUser } from '../controllers/login.ctrl.js';

const postRouter = express.Router();

postRouter.get('/', validSessionUser, getAllPostWhitComments);

export default postRouter;
