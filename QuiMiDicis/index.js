const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const messages = {
	welcome: 'Hili...',
	help: 'Iyidi, iyidi. Ni ni ni.',
}


var prod = false

var bot
if (process.env["TELEGRAM_BOT_TOKEN"]) {
    prod = true
    bot = new Telegraf(process.env["TELEGRAM_BOT_TOKEN"], { webhookReply: true });
    bot.telegram.setWebhook(process.env["WEBHOOK_ADDRESS"]);
} else if (process.env["TELEGRAM_BOT_TOKEN_DEV"]) {
    bot = new Telegraf(process.env["TELEGRAM_BOT_TOKEN_DEV"])
} else {
    throw new Error('Token not defined')
}

// Log to console middleware
bot.use((ctx, next) => {
	console.log('Message from: ' + ctx.from.username)
	console.log(ctx.message)
	return next()
})

// Common actions

function toI(message) {
    return message
        .replace(/[aeiou]/g, "i")
        .replace(/[AEIOU]/g, "I")
}

bot.start((ctx) => ctx.reply(messages.welcome));
bot.help((ctx) => ctx.reply(messages.help));

bot.on('message', (ctx) => {
    var text = ctx.message.text
    if (text) {
        ctx.reply(toI(text));
    } else {
        ctx.reply('¡¡¡Iiiiiiii!!!')
    }
});

// Multimedia
bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.catch((err) => {
	console.log('Unexpected error: ', err);
})

if (prod) {
    module.exports = async function (context, req) {
        try {
            const update = JSON.parse(req.rawBody);

            bot.handleUpdate(update).catch((error) => {
                console.log('Error processing update');
                console.log(error);
            });
        } catch (error) {
            console.error('Error parsing body', error);
            return context.res = {
                status: 400,
                body: ""
            };
        }
    };
} else {
    bot.startPolling();
}