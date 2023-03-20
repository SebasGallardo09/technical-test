import jwt from 'jsonwebtoken';
import { secretKeyJWT, tokenExpiredInJWT } from '../configs/enviroments.config.js';

const sing = async (objectUser) => {
    if (Object.entries(objectUser).length === 0) return '';
    const configToken = {
        id: objectUser.id,
        username: objectUser.username,
    };
    const security = {
        expiresIn: parseInt(tokenExpiredInJWT, 10),
    };
    return jwt.sign(configToken, secretKeyJWT, security);
};

const validToken = async (autorization) => {
    if (!autorization) return { status: 403, code: 'TOKEN_INVALID', message: 'Token not found' };
    if (!autorization.toLowerCase().startsWith('bearer')) return { status: 403, code: 'TOKEN_INVALID', message: 'The authentication is not valid' };
    try {
        const token = autorization.substring(7);
        const tokenDecode = await jwt.verify(token, secretKeyJWT);
        return { status: 200, code: 'TOKEN_VALID', objectAutentification: tokenDecode };
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            return { status: 403, code: 'TOKEN_INVALID', message: 'Token expired' };
        }
        if (e.name === 'JsonWebTokenError') {
            return { status: 403, code: 'TOKEN_INVALID', message: 'Invalid token' };
        }
    }
};

export {
    sing,
    validToken,
};
