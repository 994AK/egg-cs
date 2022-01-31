import {Service} from "egg";

const util = require('minecraft-server-util');


export default class ServerUtil extends Service {
    implement: (item: object) => void = async (item) => {
        setTimeout(async () => {
            const client = new util.RCON()
            await client.connect('yuhua.games', 25575, {timeout: 5000}); // Options is optional, defaults to 5 second timeout
            await client.login('258456'); // RCON password
            for (const i in item) {
                await client.run(item[i]);
            }

            await client.on('message', async (data) => {
                console.log(data)
                await client.close();
            })
        }, 1000)

    }
}

// const implement: (item: string) => void = async (item) => {
//     await client.connect('yuhua.games', 25575, {timeout: 2000}); // Options is optional, defaults to 5 second timeout
//     await client.login('258456'); // RCON password
//     this['gmClient'].run(item);
// }
//


