import userService from '../src/services/users.service.js';

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
    test('Listar todos los usuarios, cambiando el endpoint', async () => {
        const listUsers = await userService.getAllUsers('http://localhost:3302');
        expect(listUsers.length).toBe(0);
    });
});
