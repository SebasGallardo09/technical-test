import { v4 as uuidv4 } from 'uuid';
import {
    getAllUsers,
    getUserLoginById,
    getUserLoginByUsername,
    validUserAndPassword,
    createUser,
    updateUserLoginPassword,
    updateUserLoginEstatus,
} from '../src/models/userLogin.model.js';

describe('Validar function createUser del modelo -> userLogin.model', () => {
    test('Crear un nuevo usuario, con toda la información', async () => {
        const user = await createUser({ username: `admin${uuidv4().substring(0, 5)}`, password: 'admin00' });
        expect(user).toBe(true);
    });
    test('Crear un nuevo usuario, con elementos vacios', async () => {
        const user = await createUser({ username: '', password: '' });
        expect(user).toBe(false);
    });
    test('Crear un nuevo usuario, con el objeto en undefined', async () => {
        const user = await createUser(undefined);
        expect(user).toBe(false);
    });
    test('Validar que no se dupliquen usuarios', async () => {
        await createUser({ username: 'erick', password: 'erick' });
        const user = await createUser({ username: 'erick', password: 'erick' });
        expect(user).toBe(false);
    });
});

describe('Validar function getAllUsers del modelo -> userLogin.model', () => {
    test('Validar lista', async () => {
        const results = await getAllUsers();
        expect(results).toEqual(expect.any(Array));
    });
    test('Validar que recupere los usario', async () => {
        await createUser({ username: 'superAdmin', password: 'superAdmin' });
        const results = await getAllUsers();
        expect(results.length).toBeGreaterThan(1);
    });
});

describe('Validar function getUserLoginById del modelo -> userLogin.model', () => {
    test('Recuperar un elemento', async () => {
        const elements = await getUserLoginById(1);
        expect(elements.length).toBe(1);
    });
    test('Recuperar ningun elemento', async () => {
        const elements = await getUserLoginById(-1);
        expect(elements.length).toBe(0);
    });
});

describe('Validar function getUserLoginByUsername del modelo -> userLogin.model', () => {
    test('Consultar un usario existente', async () => {
        await createUser({ username: '0124', password: '0124' });
        const usuarioExistente = await getUserLoginByUsername('0124');
        expect(usuarioExistente.length).toBe(1);
    });
    test('Consultar usuario no existente', async () => {
        const usuarioExistente = await getUserLoginByUsername('32423PruebaNoExiste');
        expect(usuarioExistente.length).toBe(0);
    });
    test('El objeto coincide con la estructura', async () => {
        await createUser({ username: '2020', password: '2020' });
        const [user] = await getUserLoginByUsername('2020');
        expect(user).toEqual(expect.objectContaining({
            user_name: expect.any(String),
            user_enable: expect.any(Boolean),
        }));
    });
});

describe('Validar function validUserAndPassword del modelo -> userLogin.model', () => {
    test('Obtener un usuario existente', async () => {
        await createUser({ username: 'admin', password: 'admin' });
        const user = await validUserAndPassword('admin');
        expect(user.length).toEqual(1);
    });
    test('El objeto coincide con la estructura', async () => {
        const [user] = await validUserAndPassword('erick');
        expect(user).toEqual(expect.objectContaining({
            id: expect.any(Number),
            user_name: expect.any(String),
            user_enable: expect.any(Boolean),
            user_password: expect.any(String),
        }));
    });
});

describe('Validar function updateUserLoginPassword del modelo -> userLogin.model', () => {
    test('Cambiar una contraseña valida a un usuario existente', async () => {
        const result = await updateUserLoginPassword(1, 'saludos');
        expect(result).toBe(true);
    });
    test('Cambiar una contraseña a un usuario inexistente', async () => {
        const result = await updateUserLoginPassword(-1, '');
        expect(result).toBe(false);
    });
    test('Cambiar una contraseña vacia', async () => {
        const result = await updateUserLoginPassword(1, undefined);
        expect(result).toBe(false);
    });
    test('Cambiar una contraseña con un id de tipo cadena en lugar de numero', async () => {
        const result = await updateUserLoginPassword('uno', 'newPassword');
        expect(result).toBe(false);
    });
});

describe('Validar function updateUserLoginEstatus del modelo -> userLogin.model', () => {
    test('Desactivar usuario', async () => {
        const result = await updateUserLoginEstatus(1, false);
        expect(result).toBe(true);
    });
    test('Intentar desactivar usuario que no existe', async () => {
        const result = await updateUserLoginEstatus(-1, false);
        expect(result).toBe(true);
    });
    test('Intentar desactivar un usario con un id de tipo cadena en lugar de numero', async () => {
        const result = await updateUserLoginEstatus('', false);
        expect(result).toBe(false);
    });
});
