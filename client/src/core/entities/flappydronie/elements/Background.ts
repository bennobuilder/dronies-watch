import { defineConfig } from '@agile-ts/core';
import { Base, BaseConfig } from './Base';
import { Game } from './Game';
import { bg_h, bg_w } from '../sprites';

export class Background extends Base {
  public skin = 0;
  public moveSpeed: number;

  constructor(game: Game, config: BackgroundConfig) {
    super(game, { width: bg_w, height: bg_h, ...config });
    config = defineConfig(config, {
      moveSpeed: 2,
    });

    this.moveSpeed = config.moveSpeed as any;
  }
}

export type BackgroundConfig = {
  moveSpeed?: number;
} & BaseConfig;
