const redis = require('redis')
const { clietnOptions } = require('../options/params')

const pub_client = redis.createClient(clietnOptions)
pub_client.connect()

pub_client.on('connect', () => {
    console.log('client connected to redis');
})

pub_client.publish('channel 01', 'hi')
pub_client.publish('channel 01', 'wassup')

let n = 0
setInterval(() => {
    n++
    pub_client.publish('channel 01', `message ${n}`)
}, 1000)

