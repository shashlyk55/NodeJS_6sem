const redis = require('redis')
const { clietnOptions } = require('./options/params')

const client = redis.createClient(clietnOptions)

async function test(){
    await client.connect()
    console.log('connected to redis');

    const keyPrefix = 'test::'
    const testValue = 'test_value'
    const n = 10000

    async function timer(label, action) {
        const start = new Date()
        await action()
        const end = new Date()
        const period = end - start
        console.log(`${label} time: ${period} ms`);
    }

    await timer('hset 10k', async () => {
        const promises = []
        for(let i = 0; i < n; i++){
            promises.push(client.hSet(String(i), 'id', String(i), 'val', `val-${i}`))
        }
        await Promise.all(promises)
    })

    await timer('hget 10k', async () => {
        const promises = []
        for(let i = 0; i < n; i++){
            promises.push(client.hGet(String(i), 'id', 'val'))
        }
        await Promise.all(promises)
    })

    await timer('hdel 10k', async () => {
        const promises = []
        for(let i = 0; i < n; i++){
            promises.push(client.hDel(String(i), 'id', 'val'))
        }
        await Promise.all(promises)
    })

    await client.quit();
    console.log('connection closed');
}

test().catch(console.error)

