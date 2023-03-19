import express from 'express';
import { getAllPostWhitComments, getPostById } from '../controllers/post.ctrl.js';
import { validSessionUser } from '../services/jwt.service.js';

const postRouter = express.Router();

postRouter.get('/', validSessionUser, getAllPostWhitComments);
postRouter.get('/:id', validSessionUser, getPostById);

export default postRouter;
