import {Controller} from 'egg';

export default class HomeController extends Controller {
    public async index() {
        const {ctx} = this;
        ctx.body = await ctx.service.test.sayHi('egg');
    }

    public async list() {


        const {ctx} = this

        ctx.body = {
            code: 200,
            data: [
                {
                    id: '1',
                    name: '张三'
                },
                {
                    id: '2',
                    name: '张三'
                },
            ],
            msg: '操作成功'
        }
    }
}
