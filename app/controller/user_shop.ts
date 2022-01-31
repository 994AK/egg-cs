import {Controller} from 'egg';

const util = require('minecraft-server-util');
const client = new util.RCON();

export default class UserShopController extends Controller {
    // 购买物品API
    public async createUser() {
        const {ctx} = this;

        /*
        *  @name 代表玩家名
        *  @penCount 代表数量
        *  @price 代表总价格
        *  @label 代表物品名字
        *  @value 代表物品的ID
        * */
        const {name, price, value, penCount, label, quantity} = ctx.request.body


        //检查玩家的金钱
        const UUID = await ctx.model.Currency.find({username: name, money: {$gte: price}})
        if (UUID.length > 0) {
            //他需要给物品给玩家
            ctx.service.serverUtil.implement([
                `give ${name} ${value} ${penCount * quantity}`
            ])
            console.log('已经给玩家', label)
            //并且扣钱
            await ctx.model.Currency.update(
                {username: name},
                {$inc: {money: -price}},
                {
                    upsert: true,
                    multi: true
                }
            )

            ctx.body = {
                code: 201,
                msg: `${name}获得${label}成功,并且扣除了${price}金币`,
            }
        } else {
            const money = await ctx.model.Currency.find({username: name})
            //不够钱的情况
            ctx.body = {
                code: 401,
                msg: `(。・＿・。)ﾉI’m sorry~金币不足,目前金币${money[0].money},商品总价格${price}`,
            }
        }


    }

    //服务器查询信息
    public async serveUser() {
        const {ctx} = this

        const query = await util.queryFull('yuhua.games')
        client.on('message', (mes: { message: string, requestID: number }) => {
            console.log(mes)
        })

        ctx.body = {
            code: 201,
            data: query
        }
    }

    public async enchant() {
        const {ctx} = this;


        ctx.body = {
            code: 201,
            data: "附魔成功",
            msg: '操作成功'
        }
    }
}
