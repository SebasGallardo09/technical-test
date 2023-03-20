import { sing, validToken } from '../src/services/jwt.service.js';

describe('Create token jwt', () => {
    test('Crear un token mediante un objectUser valido', async () => {
        const token = await sing({ id: 1, user_name: 'erick', user_enable: true });
        expect(token).toMatch(/(^[\w-]*\.[\w-]*\.[\w-]*$)/);
    });
    test('Intentar crear un token con un objectUser vacio', async () => {
        const token = await sing({});
        expect(token).toBe('');
    });
});

describe('Validar token jwt', () => {
    test('Token correctamente generado correctamente con estructura correcta (Beare {token})', async () => {
        const token = await sing({ id: 1, user_name: 'erick', user_enable: true });
        const resultValid = await validToken(`Bearer ${token}`);
        expect(resultValid.code).toBe('TOKEN_VALID');
    });
    test('Enviar token vacio', async () => {
        const resultValid = await validToken('');
        expect(resultValid.message).toBe('Token not found');
    });
    test('Token correctamente generado correctamente sin estructura correcta (token)', async () => {
        const token = await sing({ id: 1, user_name: 'erick', user_enable: true });
        const resultValid = await validToken(`${token}`);
        expect(resultValid.message).toBe('The authentication is not valid');
    });
    test('Enviar un token con estructura valida pero generado con otra llave secreta', async () => {
        // Token generado con el debugger de jwt
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const resultValid = await validToken(`Bearer ${token}`);
        expect(resultValid.message).toBe('Invalid token');
    });
    test('Enviar un token valido, pero que fue generado en otro tiempo', async () => {
        // Token generado con el debugger de jwt
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY3OTE5MDk1NCwiZXhwIjoxNjc5MTkxNTU0fQ.MccfkdCvLdKth8Rk39sQbBicmw82fUrAlnEQYXkdpS8';
        const resultValid = await validToken(`Bearer ${token}`);
        expect(resultValid.message).toBe('Token expired');
    });
});
