import { Scenes } from 'telegraf';
import { Command } from '../commands';
import { BotContext } from '../types';

export abstract class Scene {
  private _scene: Scenes.BaseScene<BotContext>;
  private _commands: Command[];

  set scene(scene: Scenes.BaseScene<BotContext>) {
    this._scene = scene;
  }

  get scene() {
    return this._scene;
  }

  set commands(commands: Command[]) {
    this._commands = commands;
  }

  get commands() {
    return this._commands;
  }

  protected abstract handle(): void;
}
