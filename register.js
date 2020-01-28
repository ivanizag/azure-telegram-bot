const Telegraf = require('telegraf')

bot = new Telegraf(process.env["TELEGRAM_BOT_TOKEN"], { webhookReply: true });
bot.telegram.setWebhook(process.env["WEBHOOK_ADDRESS"]);
