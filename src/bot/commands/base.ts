import { Telegraf, Scenes } from 'telegraf';

export abstract class Command {
  protected abstract handle(bot: Telegraf | Scenes.BaseScene): void;

  constructor(bot: Telegraf | Scenes.BaseScene) {
    this.handle(bot);
  }
}
