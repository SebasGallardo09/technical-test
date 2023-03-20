import postServices from '../services/post.service.js';
import commentsServices from '../services/comments.service.js';
import usersServices from '../services/users.service.js';
import { getAllUser, insertManyUsers } from '../models/userPost.model.js';
import { getAllIdPost, insertManyPost } from '../models/post.model.js';
import { insertManyComments } from '../models/comments.model.js';

const insertarUsuarios = async () => {
    const listaUsersPost = await usersServices.getAllUsers();
    const usersExisteInDB = await getAllUser();
    if (listaUsersPost.length === usersExisteInDB.length) return 0;
    const usersNotExisteInDataBase = await listaUsersPost.filter((valor) => (!usersExisteInDB.find((item) => valor.id === item.id)));
    if (usersNotExisteInDataBase.length > 0) {
        const userMap = usersNotExisteInDataBase.map((value) => ([parseInt(value.id, 10), value.name, value.email, value.website]));
        return insertManyUsers(userMap);
    }
    return 0;
};

const insertComments = async (postId) => {
    const listComments = await commentsServices.getAllCommentsByIdPost(postId);
    const commentsList = listComments.map((value) => ([parseInt(value.id, 10), value.postId, value.name, value.email, value.body]));
    return insertManyComments(commentsList);
};

const insertPost = async () => {
    const listPost = await postServices.getAllPosts();
    const postExisteInDB = await getAllIdPost();
    if (listPost.length === postExisteInDB.length) return 0;
    const postsNotExisteInDataBase = await listPost.filter((valor) => (!postExisteInDB.find((item) => valor.id === item.id)));
    if (postsNotExisteInDataBase.length > 0) {
        const postMap = postsNotExisteInDataBase.map((value) => ([parseInt(value.id, 10), value.userId, value.title, value.body]));
        const resultInserPost = await insertManyPost(postMap);
        if (resultInserPost === 0) return 0;
        const arrayCommentsProcess = [];
        postMap.forEach((element) => (arrayCommentsProcess.push(insertComments(element[0]))));
        await Promise.allSettled(arrayCommentsProcess);
        console.info('Process complete...');
        return resultInserPost;
    }
    console.info('Process complete...');
    return 0;
};

const initApp = async () => ({
    userInserts: await insertarUsuarios(),
    postInserts: await insertPost(),
});

export default { initApp };
