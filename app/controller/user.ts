import {Controller} from 'egg';
// @ts-ignore
import moment = require("moment");

moment.locale('zh-cn');

export default class UserController extends Controller {
    public async register() {
        const {ctx} = this
        const {username, password, association} = ctx.request.body.user

        const result = await ctx.service.user.register(username, password, association)

        if (result.length > 0) {
            ctx.body = {
                code: 401,
                data: [],
                msg: '已注册过'
            }
        } else {
            const user = new ctx.model.Users({...ctx.request.body.user, newcomer: 0})
            await user.save()
            ctx.service.serverUtil.implement([
                    `whitelist add ${association}`
                ]
            )

            ctx.body = {
                code: 201,
                data: user,
                msg: '注册成功'
            }
        }
    }

    public async login() {
        const {ctx, app} = this
        const {username, password} = ctx.request.body.user

        const result = await ctx.service.user.login(username, password)

        if (result.length !== 0) {
            const token = app.jwt.sign({
                'userName': username, //需要存储的 token 数据
            }, app.config.jwt.secret, {expiresIn: '240h'}); // 240h token过期

            ctx.set({'token': token}) //设置headers
            ctx.body = {
                code: 201,
                data: {
                    token: token,
                    username: result[0].association,
                    userId: result[0]._id,
                    newcomer: result[0].newcomer
                },
                msg: '登录成功'
            }
        } else {
            ctx.body = {
                code: 401,
                data: result,
                msg: '账号或者密码错误'
            }
        }

    }

    //前端获取玩家信息
    public async userFind() {
        const {ctx, app} = this
        try {
            //查询关联表
            const users = await ctx.model.Users.aggregate([{
                $lookup: {
                    from: 'currencies', //查询表
                    localField: "username", // 对应的信息
                    foreignField: "username", //对应的信息
                    as: "cur" // 命名保存
                },
            }])

            //接收token
            const token: any = ctx.request.header.token;
            const Name: any = app.jwt.verify(token, "123456")

            //筛选符合的
            const data = users.filter(v => v.username === Name.userName);
            ctx.body = {
                code: 200,
                data: {
                    username: data[0].association,
                    userId: data[0]._id,
                    newcomer: data[0].newcomer,
                    money: data[0].cur[0].money,
                },
                msg: "查询成功"
            }
        } catch (err) {
            ctx.body = {
                code: 401,
                msg: '查询失败'
            }
        }

    }

    //新人礼包
    public async newcomer() {
        const {ctx} = this
        // 1.ID 2.修改数据库对应的信息+1 3.给物品
        console.log(ctx.request.body, 111)
        const data = await ctx.model.Users.update(
            {_id: ctx.request.body._id, newcomer: {$lt: 1}},
            {$set: {newcomer: 1}}
        )

        if (data.nModified === 1) {
            ctx.service.serverUtil.implement(
                [
                    `cmi bossbarmsg all -t:5 -n:test -p:5/3 -c:red -s:20 &a&c&l${ctx.request.body.username}&a领取了新人礼包 欢迎他！`,
                    `cmi kit Advanced ${ctx.request.body.username}`,
                ]
            )
            ctx.body = {
                code: '201',
                msg: '获取成功'
            }
        }


        // console.log(1)
        ctx.body = {
            code: '201',
            msg: '你已经获取过了'
        }

    }


    // 签到
    public async signIn() {
        const {ctx} = this
        const {username} = ctx.request.body

        console.log(username,ctx.request.body)
        const re = await ctx.model.SignIn.find({username: username})

        if (re.length > 0) {
            //当用户进到这层,就说明用户已经注册过了
            const Sign = await ctx.model.SignIn.find({username: username})
            Sign.map(async i => {
                //本地时间
                const momentFor = new Date(moment().format("l")).valueOf()
                //数据库更新时间
                const updatedAt = new Date(moment(i.updatedAt).format('l')).valueOf()
                if (updatedAt === momentFor) {
                    console.log("已签到过了", username)
                    ctx.body = {
                        code: 200,
                        msg: '已签到过'
                    }
                } else {
                    ctx.body = {
                        code: 200,
                        msg: '签到成功 +20金币'
                    }

                    await ctx.model.SignIn.update(
                        {username: username},
                        {$inc: {times: +1}},
                        {
                            upsert: true,
                            multi: true
                        }
                    )

                    await ctx.model.Currency.update(
                        {username: username},
                        {$inc: {money: +20}},
                        {
                            upsert: true,
                            multi: true
                        }
                    )
                    console.log("签到成功", username)
                }
            })
        } else {
            const Sign = await new ctx.model.SignIn({
                username: username,
                times: 1,
            })

            const Currencies = await new ctx.model.Currency({
                username: username,
                money: 100,//默认一百块钱
            })


            await Sign.save()
            await Currencies.save()
            ctx.body = {
                code: 200,
                msg: '首次签到成功 +100金币'
            }
        }


        // re.map(i => {
        //     //当前时间
        //     const momentFor = moment().format("l")
        //
        //     //数据库更新时间
        //     const updatedAt = moment(i.updatedAt).format('l')
        //
        //
        //     if (updatedAt === momentFor) {
        //         console.log(updatedAt, momentFor)
        //         console.log(11111);
        //     } else {
        //         console.log(updatedAt, momentFor)
        //         console.log(22222)
        //     }
        //
        // })
    }

}
