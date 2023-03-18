import bcrypt from 'bcrypt';
import { saltRounds } from '../configs/enviroments.config.js';

const encryptText = (textPlain) => (bcrypt.hashSync(textPlain, saltRounds));

const compare = (textPlain, password) => (bcrypt.compareSync(textPlain, password));

export {
    encryptText,
    compare,
};
