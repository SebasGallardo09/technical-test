import axios from 'axios';
import { endpointUser } from '../configs/enviroments.config.js';

const getAllUsers = async () => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: endpointUser,
            headers: { },
        };
        const response = await axios(config);
        return response.data;
    } catch (e) {
        console.error(`Error: user.serv -> getAllUsers -> ${e}`);
        return [];
    }
};

export default { getAllUsers };
