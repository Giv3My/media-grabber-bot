import { Markup, Scenes } from 'telegraf';
import { BotContext } from '../bot/types';

export const homeScene = new Scenes.BaseScene<BotContext>('home');

const homeSceneKeyboard = Markup.keyboard(
  [
    Markup.button.callback('TikTok', 'tiktok'),
    Markup.button.callback('Instagram', 'instagram'),
  ],
  {
    wrap: (_, index, currentRow) => currentRow.length >= (index + 3) / 2,
  }
);

homeScene.enter((ctx) => {
  ctx.reply('Choose from where to download', homeSceneKeyboard.oneTime().resize());
});

homeScene.hears('TikTok', (ctx) => {
  ctx.scene.enter('tiktok');
});

homeScene.on('message', (ctx) => {
  ctx.scene.reenter();
});
