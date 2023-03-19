import { getAllUser } from '../models/userPost.model.js';

const getAllUserPostCtrl = async (req, res) => {
    res.status(200).json(await getAllUser());
};
const getUserById = (req, res) => {
    res.status(200).json(getAllUser());
};

export { getAllUserPostCtrl, getUserById };
