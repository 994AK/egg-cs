import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg';


export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1642572957238_7456';

    // add your egg config in here
    config.middleware = [];

    //关闭crsf 开始跨域
    config.security = {
        csrf: {
            enable: false
        },
        domainWhiteList: []
    }

    config.cors = {
        origin: '*',
        allowMethods: 'GET, PUT,  POST, DELETE, PATCH',
    }

    config.mongoose = {
        url: 'mongodb://localhost:27017/server',
    }

    config.jwt = {
        secret:'123456'
    }

    // add your special config in here
    const bizConfig = {
        sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    };

    // the return config will combines to EggAppConfig
    return {
        ...config,
        ...bizConfig,
    };
};
