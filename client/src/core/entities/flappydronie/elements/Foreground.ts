import { defineConfig } from '@agile-ts/core';
import { Base, BaseConfig } from './Base';
import { Game } from './Game';
import { fg_h, fg_w } from '../sprites';

export class Foreground extends Base {
  public skin = 0;
  public moveSpeed: number;

  constructor(game: Game, config: ForegroundConfig) {
    super(game, {
      ...config,
      collisionBox: { width: fg_w, height: fg_h, ...config.collisionBox },
    });
    config = defineConfig(config, {
      moveSpeed: 2,
    });

    this.moveSpeed = config.moveSpeed as any;
  }
}

export type ForegroundConfig = {
  moveSpeed?: number;
} & BaseConfig;
