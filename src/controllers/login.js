import { sing } from '../services/jwt.service.js';
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

// eslint-disable-next-line import/prefer-default-export
export { login };
