import { Markup, Scenes } from 'telegraf';
import { MediaGroup } from 'telegraf/typings/telegram-types';
import { validateUrl, getMediaData } from '../../helpers';
import { InstagramMediaData } from '../../types/instagram';
import { BotContext } from '../types';

export const instagramScene = new Scenes.BaseScene<BotContext>('instagram');

const instagramKeyboard = Markup.keyboard([
  Markup.button.callback('🔙 Go Back', 'go_back'),
])
  .oneTime()
  .resize();

instagramScene.enter((ctx) => {
  ctx.reply('Input url of the instagram media(video or post)', instagramKeyboard);
});

instagramScene.hears('🔙 Go Back', (ctx) => {
  ctx.scene.enter('home');
});

instagramScene.on('message', async (ctx) => {
  if ('text' in ctx.message) {
    const url = ctx.message.text;

    const isValid = validateUrl(url, 'instagram');

    if (!isValid) {
      return ctx.reply('Enter a valid instagram link(reel or post)');
    }

    const { data, status } = (await getMediaData(ctx.message.text)) as InstagramMediaData;

    if (!data || !status) {
      return await ctx.reply(
        'An error occurred while processing your request, please try again later'
      );
    }

    ctx.replyWithMediaGroup(
      data.map((item) => ({
        type: item.type === 'image' ? 'photo' : item.type,
        media: item.url,
        caption: `[Instagram link](${url})\n\nDownloaded in @${ctx.botInfo.username}`,
        parse_mode: 'MarkdownV2',
      })) as MediaGroup,
      {}
    );
  } else {
    return ctx.reply('Enter a valid instagram link(reel or post)');
  }
});
