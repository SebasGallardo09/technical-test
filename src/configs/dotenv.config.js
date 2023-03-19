import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
    throw result.error;
}

const { parsed: envs } = result;
if (envs.showEnviroments) console.info(envs);

export default envs;
