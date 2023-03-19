import userService from '../src/services/users.service.js';
import postService from '../src/services/post.service.js';
import commentsService from '../src/services/comments.service.js';

describe('Servicio de usuarios', () => {
    test('Listar todos los usuarios', async () => {
        const listUsers = await userService.getAllUsers();
        expect(listUsers.length).toBe(10);
    });
    test('Los usuarios cumplen con la extructura', async () => {
        const [objectUser] = await userService.getAllUsers();
        expect(objectUser).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            username: expect.any(String),
            email: expect.any(String),
            website: expect.any(String),
        }));
    });
});

describe('Servicio de post', () => {
    test('Listar todos los usuarios', async () => {
        const listAllPost = await postService.getAllPosts();
        expect(listAllPost.length).toBe(100);
    });
    test('Los post cumplen con la extructura', async () => {
        const [objectPost] = await postService.getAllPosts();
        expect(objectPost).toEqual(expect.objectContaining({
            id: expect.any(Number),
            userId: expect.any(Number),
            title: expect.any(String),
            body: expect.any(String),
        }));
    });
});

describe('Servicio de comentarios', () => {
    test('Listar comentarios con postID igual a 10', async () => {
        const listComments = await commentsService.getAllCommentsByIdPost(10);
        expect(listComments.length).toBe(5);
    });
    test('Listar comentarios con postID igual a 15', async () => {
        const listComments = await commentsService.getAllCommentsByIdPost(15);
        expect(listComments.length).toBe(5);
    });
    test('Listar comentarios con postID igual a 100', async () => {
        const listComments = await commentsService.getAllCommentsByIdPost(100);
        expect(listComments.length).toBe(5);
    });
    test('Listar comentarios con postID igual a -1', async () => {
        const listComments = await commentsService.getAllCommentsByIdPost(-1);
        expect(listComments.length).toBe(0);
    });
    test('Listar comentarios con postID igual a 0', async () => {
        const listComments = await commentsService.getAllCommentsByIdPost(0);
        expect(listComments.length).toBe(0);
    });
    test('Listar comentarios con postID igual a 101', async () => {
        const listComments = await commentsService.getAllCommentsByIdPost(101);
        expect(listComments.length).toBe(0);
    });
    test('Los comments cumplen con la extructura', async () => {
        const [objectComments] = await commentsService.getAllCommentsByIdPost(10);
        expect(objectComments).toEqual(expect.objectContaining({
            id: expect.any(Number),
            postId: expect.any(Number),
            name: expect.any(String),
            email: expect.any(String),
            body: expect.any(String),
        }));
    });
});
