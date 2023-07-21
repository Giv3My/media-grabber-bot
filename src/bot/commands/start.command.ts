import { Telegraf } from 'telegraf';
import { Command } from './base';

export class StartCommand extends Command {
  constructor(bot: Telegraf) {
    super(bot);
  }

  protected handle(bot: Telegraf) {
    bot.start((ctx) => {
      ctx.reply(
        [
          '🤖 Hello there! I am the MediaGrabberBot 📸🎥',
          "🎉 Welcome to MediaGrabberBot! I'm here to help you easily download media from TikTok and Instagram. Just send me the link to the post or video you want to download, and I'll fetch it for you!",
          "🔗 Simply copy and paste the TikTok or Instagram link, and I'll handle the rest. Whether it's a funny TikTok video or a stunning Instagram photo, I've got you covered!",
          "📩 Send me a link now and let's get started!",
          '🌟 Happy downloading!',
          'To start use the bot type /home',
        ].join('\n\n')
      );
    });
  }
}
