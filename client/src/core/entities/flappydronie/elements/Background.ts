import { defineConfig } from '@agile-ts/core';
import { Base, BaseConfig } from './Base';

export class Background extends Base {
  public skin = 0;
  public moveSpeed: number;

  constructor(config: BackgroundConfig) {
    super(config);
    config = defineConfig(config, {
      moveSpeed: 2,
    });

    this.moveSpeed = config.moveSpeed as any;
  }
}

type BackgroundConfig = {
  moveSpeed?: number;
} & BaseConfig;
