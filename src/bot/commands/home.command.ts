import { Scenes, Telegraf } from 'telegraf';
import { Command } from './base';
import { BotContext } from '../types';

export class HomeCommand extends Command {
  constructor(bot: Telegraf<BotContext> | Scenes.BaseScene<BotContext>) {
    super(bot);
  }

  protected handle(bot: Telegraf<BotContext> | Scenes.BaseScene<BotContext>) {
    bot.command('home', (ctx) => {
      ctx.scene.enter('home');
    });
  }
}
