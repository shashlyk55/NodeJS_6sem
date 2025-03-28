const redis = require('redis')
const { clietnOptions } = require('../options/params')

const sub_client = redis.createClient(clietnOptions)
sub_client.connect()

sub_client.on('connect', () => {
    console.log('client connected to redis');
})

sub_client.subscribe('channel 01', (message, channel) => {
    console.log(`sub channel: ${channel}: ${message}`);
})
setTimeout(() => {
    sub_client.unsubscribe()
    sub_client.quit()
}, 30000)


