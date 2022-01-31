import {Controller} from 'egg';

export default class InstructionController extends Controller {
    public async index() {
        const {ctx} = this;


        const {value, multiplePrompt, username, otherSite} = ctx.request.body
        switch (value) {
            case 'sethome':
                ctx.service.serverUtil.implement([
                    `cmi sethome ${multiplePrompt} ${username} `
                ])
                break
            case 'home' :
                ctx.service.serverUtil.implement([
                    `cmi home ${multiplePrompt} ${username} `
                ])
                break
            case 'tpa':
                // await serverUtil(`/cmi tpa 4512 66a`)
                ctx.service.serverUtil.implement([
                    `cmi sudo ${username} /cmi tpa ${otherSite}`
                ])
        }


        ctx.body = await ctx.service.test.sayHi('egg');
    }

}
