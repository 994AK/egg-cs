import {Application} from 'egg';

export default (app: Application) => {
    //用户交易请求
    require('./router/user_shop')(app)
    require('./router/user')(app)
    require('./router/user_instruction')(app)
};
