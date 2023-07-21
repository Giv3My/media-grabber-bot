import { Telegraf } from 'telegraf';

export class HelpCommand {
  constructor(bot: Telegraf) {
    bot.command('help', (ctx) => {
      ctx.reply(
        [
          "🔗 Simply copy and paste the TikTok or Instagram link, and I'll handle the rest. Whether it's a funny TikTok video or a stunning Instagram photo, I've got you covered!",
          "📩 Send me a link now and let's get started!",
          '🌟 Happy downloading!',
          'To start use the bot type /home',
        ].join('\n\n')
      );
    });
  }
}
