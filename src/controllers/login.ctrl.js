import { sing, validToken } from '../services/jwt.service.js';
import { validUserAndPassword } from '../models/userLogin.model.js';
import { compare } from '../services/bcrypt.service.js';

const USER_OR_PASSWORD_INVALID = { status: 401, code: 'USER_OR_PASSWORD_INVALID', message: 'The username or password are incorrect' };
const USER_IS_DISABLED = { status: 401, code: 'USER_IS_DISABLED', message: 'The user is not enabled' };

const login = async (req, res) => {
    const [userData] = await validUserAndPassword(req.body.username);
    if (!userData) return res.status(401).json(USER_OR_PASSWORD_INVALID);
    if (!compare(req.body.password, userData.user_password)) return res.status(401).json(USER_OR_PASSWORD_INVALID);
    if (!userData.user_enable) return res.status(401).json(USER_IS_DISABLED);
    return res.status(200).json({ token: await sing(userData) });
};

const validSessionUser = async (req, res, next) => {
    const autorization = req.get('authorization');
    const sessionValid = await validToken(autorization);
    if (sessionValid.status !== 200) return res.status(sessionValid.status).json(sessionValid);
    req.userSession = sessionValid;
    return next();
};

export { login, validSessionUser };
