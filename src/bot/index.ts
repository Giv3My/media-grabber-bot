import { Telegraf, session } from 'telegraf';
import { StartCommand } from './commands';

export class Bot {
  bot: Telegraf;
  commands = [StartCommand];

  constructor(private readonly token: string) {
    this.bot = new Telegraf(this.token);
    this.bot.use(session());
  }

  init() {
    this.bot.launch();

    for (const command of this.commands) {
      new command(this.bot);
    }
  }
}
