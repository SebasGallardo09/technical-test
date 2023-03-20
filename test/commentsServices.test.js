import commentsService from '../src/services/comments.service.js';

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
    test('Listar comentarios con postID en undefined', async () => {
        const listComments = await commentsService.getAllCommentsByIdPost(undefined);
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
    test('Consultar datos cambiando el endpoint', async () => {
        const listComments = await commentsService.getAllCommentsByIdPost(1, 'http://localhost:3302');
        expect(listComments.length).toBe(0);
    });
});
