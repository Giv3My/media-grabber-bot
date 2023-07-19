import { Telegraf } from 'telegraf';
import { BotContext } from '../types';

export class HomeCommand {
  constructor(bot: Telegraf<BotContext>) {
    bot.command('home', (ctx) => {
      ctx.scene.enter('home');
    });

    bot.on('message', (ctx) => {
      ctx.reply('To start use the bot type /home');
    });
  }
}
