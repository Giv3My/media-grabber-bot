import { Telegraf } from 'telegraf';
import { BotContext } from '../types';

export class InstagramCommand {
  constructor(bot: Telegraf<BotContext>) {
    bot.command('instagram', (ctx) => {
      ctx.scene.enter('instagram');
    });
  }
}
