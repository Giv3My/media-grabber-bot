import { Telegraf, Scenes } from 'telegraf';
import { Command } from './base';

export class HelpCommand extends Command {
  constructor(bot: Telegraf | Scenes.BaseScene) {
    super(bot);
  }

  protected handle(bot: Telegraf | Scenes.BaseScene) {
    bot.command('help', (ctx) => {
      ctx.reply(
        [
          "🔗 Simply copy and paste the TikTok, Instagram or YouTube link, and I'll handle the rest. Whether it's a funny TikTok video or a stunning Instagram photo, I've got you covered!",
          "📩 Send me a link now and let's get started!",
          '🌟 Happy downloading!',
          'To start use the bot type /home',
        ].join('\n\n')
      );
    });
  }
}
