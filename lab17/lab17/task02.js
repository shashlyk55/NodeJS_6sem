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

    await timer('SET 10k', async () => {
        const promises = []
        for(let i = 0; i < n; i++){
            promises.push(client.set(`${keyPrefix}${i}`, testValue))
        }
        await Promise.all(promises)
    })

    await timer('GET 10k', async () => {
        const promises = []
        for(let i = 0; i < n; i++){
            promises.push(client.get(`${keyPrefix}${i}`))
        }
        await Promise.all(promises)
    })

    await timer('DEL 10k', async () => {
        const promises = []
        for(let i = 0; i < n; i++){
            promises.push(client.del(`${keyPrefix}${i}`))
        }
        await Promise.all(promises)
    })

    await client.quit();
    console.log('connection closed');
}

test().catch(console.error)

