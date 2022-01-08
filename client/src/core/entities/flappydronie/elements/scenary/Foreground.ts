import { Base, BaseConfig } from '../Base';
import { Game } from '../Game';
import { fg_h, fg_w } from '../../sprites';

export class Foreground extends Base {
  public skin = 0;

  constructor(game: Game, config: ForegroundConfig) {
    super(game, {
      ...config,
      collisionBox: { width: fg_w, height: fg_h, ...config.collisionBox },
    });
  }
}

export type ForegroundConfig = BaseConfig;
