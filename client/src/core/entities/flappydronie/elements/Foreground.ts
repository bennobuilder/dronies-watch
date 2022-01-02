import { defineConfig } from '@agile-ts/core';
import { Base, BaseConfig } from './Base';

export class Foreground extends Base {
  public skin = 0;
  public moveSpeed: number;

  constructor(config: ForegroundConfig) {
    super(config);
    config = defineConfig(config, {
      moveSpeed: 2,
    });

    this.moveSpeed = config.moveSpeed as any;
  }
}

type ForegroundConfig = {
  moveSpeed?: number;
} & BaseConfig;
