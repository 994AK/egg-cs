const util = require('minecraft-server-util');
const client = new util.RCON();

const implement: (item: string) => void = async (item) => {
    await client.connect('yuhua.games', 25575); // Options is optional, defaults to 5 second timeout
    await client.login('258456'); // RCON password
    await client.run(item)
    await client.on('message', (mes: { message: string, requestID: number }) => {
        console.log(mes, 111)
        client.close()
    })
}


export const serverUtil = async (item) => {
    implement(item)
}
