import { getAllCommentsByIdPost, insertManyComments } from '../src/models/comments.model';

const getRndInteger = (min = 10000, max = 20000) => (Math.floor(Math.random() * (max - min)) + min);

describe('Validar function insertManyComments del modelo -> comments.model', () => {
    test('Insertar dos comentarios diferentes', async () => {
        const result = await insertManyComments([
            [getRndInteger(), 1, 'Test1', 'test@gmail.com', 'Comments test'],
            [getRndInteger(), 1, 'Test2', 'test@gmail.com', 'Comments test'],
        ]);
        expect(result).toBe(2);
    });
    test('Insertar un solo comentario', async () => {
        const result = await insertManyComments([
            [getRndInteger(), 1, 'Test1', 'test@gmail.com', 'Comments test'],
        ]);
        expect(result).toBe(1);
    });
    test('Insertar un objeto que no tenga formato valido', async () => {
        const result = await insertManyComments([[]]);
        expect(result).toBe(0);
    });
});

describe('Validar function getAllCommentsByIdPost del modelo -> comments.model', () => {
    test('Consultar comentario con postId 10', async () => {
        const result = await getAllCommentsByIdPost(10);
        expect(result.length).toBe(5);
    });
    test('Consultar comentario con postId -1', async () => {
        const result = await getAllCommentsByIdPost(-1);
        expect(result.length).toBe(0);
    });
    test('Consultar comentario sin postId', async () => {
        const result = await getAllCommentsByIdPost();
        expect(result.length).toBe(0);
    });
    test('La estructura de la respuesta es la correcta', async () => {
        const [result] = await getAllCommentsByIdPost(1);
        expect(result).toEqual(expect.objectContaining({
            body: expect.any(String),
            email: expect.any(String),
            id: expect.any(Number),
            id_post: expect.any(Number),
            name_comment: expect.any(String),
        }));
    });
});
