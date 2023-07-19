import { Telegraf, session, Scenes } from 'telegraf';
import { homeScene, tikTokScene } from '../scenes';
import { StartCommand, HomeCommand } from './commands';
import { BotContext } from './types';

export class Bot {
  bot: Telegraf<BotContext>;
  commands = [StartCommand, HomeCommand];

  constructor(private readonly token: string) {
    const stage = new Scenes.Stage<BotContext>([homeScene, tikTokScene]);

    this.bot = new Telegraf<BotContext>(this.token);
    this.bot.use(session());
    this.bot.use(stage.middleware());
  }

  init() {
    this.bot.launch();
    for (const command of this.commands) {
      new command(this.bot);
    }
  }
}
