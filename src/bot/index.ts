import { Telegraf, session, Scenes } from 'telegraf';
import { homeScene, tikTokScene, instagramScene } from './scenes';
import {
  StartCommand,
  HelpCommand,
  HomeCommand,
  TikTokCommand,
  InstagramCommand,
} from './commands';
import { BotContext } from './types';

export class Bot {
  bot: Telegraf<BotContext>;
  commands = [StartCommand, HelpCommand, HomeCommand, TikTokCommand, InstagramCommand];

  constructor(private readonly token: string) {
    const stage = new Scenes.Stage<BotContext>([homeScene, tikTokScene, instagramScene]);

    this.bot = new Telegraf<BotContext>(this.token);
    this.bot.use(session());
    this.bot.use(stage.middleware());
  }

  init() {
    this.bot.launch();

    for (const command of this.commands) {
      new command(this.bot);
    }

    this.bot.on('message', (ctx) => {
      ctx.reply('To start use the bot type /home');
    });
  }
}
