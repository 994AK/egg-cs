import {EggPlugin} from 'egg';

const plugin: EggPlugin = {

    cors: {
        enable: true,
        package: 'egg-cors',
    },
    mongoose: {
        enable: true,
        package: 'egg-mongoose',
    },
    jwt: {
        enable: true,
        package: 'egg-jwt'
    }
};

export default plugin;
