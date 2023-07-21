import { Markup, Scenes } from 'telegraf';
import { ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { Command } from '../commands';
import { BotContext } from '../types';

export abstract class Scene {
  protected scene: Scenes.BaseScene<BotContext>;
  protected keyboard: Markup.Markup<ReplyKeyboardMarkup>;
  protected commands: Command[];

  protected abstract handle(): void;

  getScene() {
    return this.scene
  }
}
