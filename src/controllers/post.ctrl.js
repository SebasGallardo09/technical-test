import { getAllCommentsByIdPost } from '../models/comments.model.js';
import { getAllPost } from '../models/post.model.js';

const getAllPostWhitComments = async (req, res) => {
    const listPost = await getAllPost();
    const listaItemFinal = listPost.map(async (item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
        author: item.name_person,
        website: item.website,
        mail: item.email,
        comments: await getAllCommentsByIdPost(item.id),
    }));
    return res.status(200).json(await Promise.all(listaItemFinal));
};

export { getAllPostWhitComments };
