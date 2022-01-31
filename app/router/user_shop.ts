import {Application} from 'egg';

module.exports = (app: Application) => {

    const {controller, router} = app;
    const jwtErr = app.middleware.jwtErr(app.config.jwt)

    //用户的请求
    router.post('/user/createUser', jwtErr, controller.userShop.createUser)
    router.post('/user/serveUser', jwtErr, controller.userShop.serveUser)
    router.post('/user/enchant', jwtErr, controller.userShop.enchant)
};
