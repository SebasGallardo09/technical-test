import bcrypt from 'bcrypt';
import { saltRounds } from '../configs/enviroments.config.js';
import validData from '../utilis/validData.js';

const encryptText = (textPlain) => {
    if (validData.isBlank(textPlain)) return '';
    if (typeof textPlain !== 'string') return '';
    return bcrypt.hashSync(textPlain, parseInt(saltRounds, 10));
};

const compare = (textPlain, stringEncrypt) => {
    if (typeof textPlain !== 'string' || typeof stringEncrypt !== 'string') return false;
    return bcrypt.compareSync(textPlain, stringEncrypt);
};

export {
    encryptText,
    compare,
};
