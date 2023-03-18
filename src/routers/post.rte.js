import express from 'express';
import { getAllPost } from '../controllers/post.ctrl.js';

const postRouter = express.Router();

postRouter.post('/', getAllPost);

export default postRouter;
