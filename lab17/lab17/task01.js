const redis = require('redis')
const { clietnOptions } = require('./options/params')

const client = redis.createClient(clietnOptions)

client.connect()
client.quit()

client.on('error', (err) => console.error('error:', err))
client.on('connect', () => console.log('connect'))
client.on('end', () => console.log('end'))
client.on('ready', () => console.log('ready'))


