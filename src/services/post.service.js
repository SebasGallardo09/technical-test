import axios from 'axios';
import { endpointPost } from '../configs/enviroments.config.js';

const getAllPosts = async (endpoint = endpointPost) => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: endpoint,
            headers: { },
        };
        const response = axios(config);
        return (await response).data;
    } catch (e) {
        console.error(`Error: post.serv -> getAllPost -> ${e}`);
        return [];
    }
};

export default { getAllPosts };
