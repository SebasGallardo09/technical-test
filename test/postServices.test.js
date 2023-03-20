import postService from '../src/services/post.service.js';

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
    test('Listar todos los usuarios', async () => {
        const listAllPost = await postService.getAllPosts('http://localhost:3302');
        expect(listAllPost.length).toBe(0);
    });
});
