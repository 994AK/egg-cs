import {Application} from 'egg';

module.exports = (app: Application) => {
    const {controller, router} = app;
    const jwtErr = app.middleware.jwtErr(app.config.jwt)
    //用户的请求
    router.post('/user/register', controller.user.register)
    router.post('/user/login', controller.user.login)
    router.post('/user/newcomer',jwtErr, controller.user.newcomer)
    router.post('/user/find', jwtErr, controller.user.userFind)
    router.post('/user/signin', controller.user.signIn)
};
