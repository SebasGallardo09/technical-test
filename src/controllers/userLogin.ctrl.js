import {
    getAllUsers,
    getUserLoginById,
    getUserLoginByUsername,
    createUser,
    updateUserLoginPassword,
    updateUserLoginEstatus,
} from '../models/userLogin.model.js';

const getAllUserLogin = async (_req, res) => {
    const result = await getAllUsers();
    res.status(200).json(result);
};

const createUserLogin = async (req, res) => {
    if (!req.body.username) return res.status(400).json({ message: 'The username field cannot be empty' });
    if (!req.body.password) return res.status(400).json({ message: 'The password field cannot be empty' });
    const userExist = await getUserLoginByUsername(req.body.username);
    if (userExist.length > 0) return res.status(400).json({ message: 'The user to create already exists' });
    const result = await createUser(req.body);
    if (result) return res.status(201).json({ message: 'User creation has been successful' });
    return res.status(400).json({ message: 'The user create is failed' });
};

const updatePasswordUserLogin = async (req, res) => {
    const userExist = await getUserLoginById(req.params.id);
    if (userExist.length === 0) return res.status(400).json({ message: 'The user was not found' });
    const result = await updateUserLoginPassword(req.params.id, req.body.password);
    if (result) return res.status(200).json({ message: 'User updated has been successful' });
    return res.status(400).json({ message: 'The user updated is failed' });
};

const changueEstatusUserLogin = async (req, res) => {
    const user = await getUserLoginById(req.params.id);
    if (user.length === 0) return res.status(400).json({ message: 'The user was not found' });
    const result = await updateUserLoginEstatus(req.params.id, !user[0].user_enable);
    if (result) return res.status(200).json({ message: `User updated has been successful: The user is ${!user[0].user_enable ? 'enable' : 'disable'}` });
    return res.status(400).json({ message: 'The user updated is failed' });
};

export {
    getAllUserLogin, createUserLogin, updatePasswordUserLogin, changueEstatusUserLogin,
};
