const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

const TELEGRAM_TOKEN = '7643616990:AAFi5Ux5_X9eBcgeA_jQlJanigswCLL6pHM';
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
let offset = 0;

app.use(bodyParser.json());

async function sendMessage(chatId, text) {
    try {
        await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: text,
        });
    } catch (error) {
        console.error('Error sending message:', error.message);
    }
}

async function getUpdates() {
    try {
        const response = await axios.get(`${TELEGRAM_API}/getUpdates`, {
            params: { offset, timeout: 20 }
        });

        console.log(response.data.result)

        if (response.data.ok && response.data.result.length > 0) {
            for (const update of response.data.result) {
                offset = update.update_id + 1;

                if (update.message && update.message.text) {
                    const chatId = update.message.chat.id;
                    const text = update.message.text;

                    await sendMessage(chatId, `echo: ${text}`);
                }
            }
        }

        getUpdates();
    } catch (error) {
        console.error('Error getting updates:', error.message);
        setTimeout(getUpdates, 1000);
    }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    getUpdates();
});