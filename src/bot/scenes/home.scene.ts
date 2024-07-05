import { Markup, Scenes } from 'telegraf';
import { Scene } from './base';
import {
  HelpCommand,
  InstagramCommand,
  TikTokCommand,
  YoutubeCommand,
} from '../commands';
import { BotContext } from '../types';

export class HomeScene extends Scene {
  protected keyboard = Markup.keyboard(
    [
      Markup.button.callback('🎬 TikTok', 'tiktok'),
      Markup.button.callback('📷 Instagram', 'instagram'),
      Markup.button.callback('🎞️ YouTube', 'youtube'),
      Markup.button.callback('❌ Cancel', 'cancel'),
    ],
    {
      wrap: (_, index, currentRow) => currentRow.length >= (index + 3) / 2,
    }
  )
    .oneTime()
    .resize();

  constructor() {
    super();

    this.scene = new Scenes.BaseScene<BotContext>('home');
    this.commands = [
      new HelpCommand(this.scene),
      new TikTokCommand(this.scene),
      new InstagramCommand(this.scene),
      new YoutubeCommand(this.scene),
    ];

    this.handle();
  }

  protected handle() {
    this.scene.enter((ctx) => {
      ctx.reply('Choose where to download from', this.keyboard);
    });

    this.scene.hears('🎬 TikTok', (ctx) => {
      ctx.scene.enter('tiktok');
    });

    this.scene.hears('📷 Instagram', (ctx) => {
      ctx.scene.enter('instagram');
    });

    this.scene.hears('🎞️ YouTube', (ctx) => {
      ctx.scene.enter('youtube');
    });

    this.scene.hears('❌ Cancel', (ctx) => {
      ctx.scene.leave();
    });

    this.scene.on('message', (ctx) => {
      ctx.scene.reenter();
    });
  }
}
