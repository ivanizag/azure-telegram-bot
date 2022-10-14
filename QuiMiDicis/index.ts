import {Telegraf} from 'telegraf';
import {AzureFunction} from '@azure/functions'

const messages = {
	welcome: 'Hili...',
	help: 'Iyidi, iyidi. Ni ni ni.',
}


var prod = false
var token: string

if (process.env["TELEGRAM_BOT_TOKEN"]) {
    prod = true;
    token = process.env["TELEGRAM_BOT_TOKEN"];
} else if (process.env["TELEGRAM_BOT_TOKEN_DEV"]) {
    token = process.env["TELEGRAM_BOT_TOKEN_DEV"]
} else {
    throw new Error('Token not defined')
}
const bot = new Telegraf(token);

// Log to console middleware
bot.use((ctx, next) => {
	console.log('Message from: ' + ctx?.from?.username)
	//console.log(ctx.message)
	return next()
})

// Common actions

function toI(message: string) {
    return message
        .replace(/[aeiou]/g, "i")
        .replace(/[AEIOU]/g, "I")
}

bot.start((ctx) => ctx.reply(messages.welcome));
bot.help((ctx) => ctx.reply(messages.help));

bot.on('text', (ctx) => {
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

const httpFunction: AzureFunction = async function (context, req) {
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

if (!prod) {
    bot.launch();

    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

export default httpFunction;
