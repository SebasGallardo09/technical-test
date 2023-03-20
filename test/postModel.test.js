import { getAllIdPost, insertManyPost, getAllPost } from '../src/models/post.model.js';

const getRndInteger = (min = 10000, max = 20000) => (Math.floor(Math.random() * (max - min)) + min);

describe('Validar insertManyPost en post.model', () => {
    test('Insertar dos post diferentes', async () => {
        const result = await insertManyPost([
            [getRndInteger(), 10, 'Title test 1', 'Post test'],
            [getRndInteger(), 10, 'Title test 2', 'Post test'],
        ]);
        expect(result).toBe(2);
    });
    test('Insertar un post', async () => {
        const result = await insertManyPost([
            [getRndInteger(), 1, 'Title test 3', 'Post test'],
        ]);
        expect(result).toBe(1);
    });
    test('Insertar un objeto que no tenga formato valido', async () => {
        const result = await insertManyPost([]);
        expect(result).toBe(0);
    });
});

describe('Validar getAllIdPost en post.model', () => {
    test('Consultar registros', async () => {
        const result = await getAllIdPost();
        expect(result.length).toBeGreaterThan(1);
    });
    test('Validar estructura de la respuesta', async () => {
        const [result] = await getAllIdPost();
        expect(result).toEqual(expect.objectContaining({
            id: expect.any(Number),
        }));
    });
});

describe('Validar getAllPost en post.model', () => {
    test('Consultar registros ', async () => {
        const result = await getAllPost();
        expect(result.length).toBeGreaterThan(1);
    });
    test('Validar estructura de la respuesta', async () => {
        const [result] = await getAllPost();
        expect(result).toEqual(expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            body: expect.any(String),
            name_person: expect.any(String),
            website: expect.any(String),
            email: expect.any(String),
        }));
    });
});
