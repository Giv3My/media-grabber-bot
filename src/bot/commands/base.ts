import { Telegraf, Scenes } from 'telegraf';
import { BotContext } from '../types';

export abstract class Command {
  protected abstract handle(bot: Telegraf<BotContext> | Scenes.BaseScene<BotContext>): void;

  constructor(bot: Telegraf<BotContext> | Scenes.BaseScene<BotContext>) {
    this.handle(bot);
  }
}
