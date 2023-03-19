import { encryptText, compare } from '../src/services/bcrypt.service.js';

describe('Generar palabras encritadas', () => {
    test('Encriptar cadena vacía', () => {
        const stringEncrypt = encryptText('');
        expect(stringEncrypt).toBe('');
    });
    test('Encriptar una cadena valida', () => {
        const stringEncrypt = encryptText('passwordAdministrador');
        expect(stringEncrypt).not.toBe('');
    });
    test('Encriptar un objeto', () => {
        const stringEncrypt = encryptText({});
        expect(stringEncrypt).toBe('');
    });
    test('Encriptar un arreglo', () => {
        const stringEncrypt = encryptText([]);
        expect(stringEncrypt).toBe('');
    });
    test('Encriptar un undefined', () => {
        const stringEncrypt = encryptText();
        expect(stringEncrypt).toBe('');
    });
});

describe('Comparación de cadenas obtenidas', () => {
    const stringFirst = 'passwordAdministrador';
    const stringCompare = 'saludoPruebaDiferente';
    test('Comparar cadenas vacías', () => {
        const resultCompare = compare('', '');
        expect(resultCompare).toBe(false);
    });
    test('Comparar dos cadenas en texto plano iguales', () => {
        const resultCompare = compare(stringFirst, stringFirst);
        expect(resultCompare).toBe(false);
    });
    test('Comparar dos cadenas en texto plano diferentes', () => {
        const resultCompare = compare(stringFirst, 'pruebaDiferente');
        expect(resultCompare).toBe(false);
    });
    test('Comparar cadena encriptada y en texto plano pero igual contenido', () => {
        const stringEncrypt = encryptText(stringFirst);
        const resultCompare = compare(stringFirst, stringEncrypt);
        expect(resultCompare).toBe(true);
    });
    test('Comparar cadena encriptada y en texto plano pero diferentes textos', () => {
        const stringEncrypt = encryptText(stringFirst);
        const resultCompare = compare(stringCompare, stringEncrypt);
        expect(resultCompare).toBe(false);
    });
    test('Comparar dos undefined', () => {
        const resultCompare = compare(undefined, undefined);
        expect(resultCompare).toBe(false);
    });
    test('Comparar dos array', () => {
        const resultCompare = compare([], []);
        expect(resultCompare).toBe(false);
    });
    test('Comparar dos objetos', () => {
        const resultCompare = compare({}, {});
        expect(resultCompare).toBe(false);
    });
    test('Comparar una cadena vacia y un objeto', () => {
        const resultCompare = compare('', {});
        expect(resultCompare).toBe(false);
    });
});
