import validData from '../src/utilis/validData.js';

describe('Funcion isBlank', () => {
    test('Parametro cadena con texto', async () => {
        expect(validData.isBlank('contains texto')).toBe(false);
    });
    test('Parametro cadena vacía', async () => {
        expect(validData.isBlank('')).toBe(true);
    });
    test('Parametro con valor en null', async () => {
        expect(validData.isBlank(null)).toBe(true);
    });
    test('Parametro en undefined', async () => {
        expect(validData.isBlank(undefined)).toBe(true);
    });
    test('Array en vacío', async () => {
        expect(validData.isBlank([])).toBe(true);
    });
    test('Array con un elemento', async () => {
        expect(validData.isBlank(['item'])).toBe(false);
    });
});
