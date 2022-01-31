import {Application} from 'egg';

module.exports = (app: Application) => {
    const {controller, router} = app;

    router.post('/user/instruction', controller.userInstruction.index)
};
