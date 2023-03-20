import init from '../src/initials/initApp.js';

export default async () => {
    console.info('\nhello, this is just before tests start running');
    const result = await init.initApp();
    console.info('Se inicializo la info', result);
};
