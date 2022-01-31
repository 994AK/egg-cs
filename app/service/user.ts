import {Service} from 'egg';

/**
 * Test Service
 */
export default class User extends Service {
    public async register(username, password, association) {
        const {ctx} = this

        if (username === '' && password === '' && association === '') {
            ctx.status = 401
            ctx.body = {
                code: 401,
                data: [],
                msg: '用户名或者密码或者绑定账号没有输入'
            }
        }

        return await ctx.model.Users.find({username: username, association: association})

        //  const find = await ctx.model.Users.find({username:'123'})
        //
        // find.forEach(item=>{
        //     const currency = new ctx.model.Currency({
        //         users_id: item._id,
        //         money: 123
        //     })
        //
        //     currency.save()
        //
        //     console.log(currency)
        // })

        // const u = await ctx.model.Currency.aggregate([{
        //     $lookup: {
        //         from: 'users', //查询表
        //         localField: "users_id", // 对应的信息
        //         foreignField: "_id", //对应的信息
        //         as: "cur" // 命名保存
        //     },
        // }])
        //
        // ctx.body = u


        // console.log(currency)

        // await currency.save()
        // ctx.body = {currency}
    }

    public async login(username, password) {
        const {ctx} = this
        return await ctx.model.Users.find({username: username, password: password})
    }
}
