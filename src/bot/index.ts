import { Telegraf, session, Scenes } from 'telegraf';
import { HomeScene, TikTokScene, InstagramScene, YoutubeScene } from './scenes';
import {
  Command,
  StartCommand,
  HelpCommand,
  HomeCommand,
  TikTokCommand,
  InstagramCommand,
  YoutubeCommand,
} from './commands';
import { BotContext } from './types';

export class Bot {
  bot: Telegraf<BotContext>;
  commands: Command[];
  scenes = [
    new HomeScene(),
    new TikTokScene(),
    new InstagramScene(),
    new YoutubeScene(),
  ].map((item) => item.getScene());

  constructor(private readonly token: string) {
    const stage = new Scenes.Stage<BotContext>(this.scenes);

    this.bot = new Telegraf<BotContext>(this.token);
    this.bot.use(session());
    this.bot.use(stage.middleware());
  }

  init() {
    this.bot.launch();

    this.commands = [
      new StartCommand(this.bot),
      new HelpCommand(this.bot),
      new HomeCommand(this.bot),
      new TikTokCommand(this.bot),
      new InstagramCommand(this.bot),
      new YoutubeCommand(this.bot),
    ];

    this.bot.on('message', (ctx) => {
      ctx.reply('To start use the bot type /home');
    });
  }
}
