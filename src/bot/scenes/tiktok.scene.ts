import { Markup, Scenes } from 'telegraf';
import { validateUrl, getVideoData, normalizeUrl } from '../../helpers';
import { BotContext } from '../types';

export const tikTokScene = new Scenes.BaseScene<BotContext>('tiktok');

const tikTokSceneKeyboard = Markup.keyboard([
  Markup.button.callback('🔙 Go Back', 'go_back'),
])
  .oneTime()
  .resize();

tikTokScene.enter((ctx) => {
  ctx.reply('Input url of the tiktok video', tikTokSceneKeyboard);
});

tikTokScene.hears('🔙 Go Back', (ctx) => {
  ctx.scene.enter('home');
});

tikTokScene.on('message', async (ctx) => {
  if ('text' in ctx.message) {
    let url = ctx.message.text;
    const isValid = validateUrl(url, 'tiktok');

    if (!isValid) {
      return ctx.reply('Enter a valid tiktok url');
    }

    url = await normalizeUrl(url);
    const data = await getVideoData(url);

    if (!data) {
      return await ctx.reply(
        'An error occurred while processing your request, please try again later'
      );
    }

    ctx.replyWithVideo(
      {
        url: data.url,
      },
      {
        width: 240,
        height: 430,
        supports_streaming: true,
        caption: `[TikTok link](${url})\n\nDownloaded in @${ctx.botInfo.username}`,
        parse_mode: 'MarkdownV2',
      }
    );
  } else {
    return ctx.reply('Enter a valid tiktok url');
  }
});
