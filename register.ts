import {Telegraf} from 'telegraf';
const token = process.env["TELEGRAM_BOT_TOKEN"];
const url = process.env["WEBHOOK_ADDRESS"]
if (!token || !url) {
    console.log("Missing TELEGRAM_BOT_TOKEN and WEBHOOK_ADDRESS environment variables")
} else {
    const bot = new Telegraf(token);
    bot.telegram.setWebhook(url);
}
