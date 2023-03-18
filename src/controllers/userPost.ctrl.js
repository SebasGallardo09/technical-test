import { getAllUserPost } from '../models/userPost.model.js';

const getAllUserPostCtrl = async (req, res) => {
    res.status(200).json(await getAllUserPost());
};
const getUserById = (req, res) => {
    res.status(200).json(getAllUserPost());
};

export { getAllUserPostCtrl, getUserById };
