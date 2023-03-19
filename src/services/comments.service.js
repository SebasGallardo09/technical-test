import axios from 'axios';
import { endpointComment } from '../configs/enviroments.config.js';

const getAllCommentsByIdPost = async (id) => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${endpointComment}?postId=${id}`,
            headers: { },
        };
        const response = await axios(config);
        return response.data;
    } catch (e) {
        console.error(`Error: post.serv -> getAllPost -> ${e}`);
        return [];
    }
};

export default { getAllCommentsByIdPost };
