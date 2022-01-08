import { Base, BaseConfig } from '../Base';
import { Game } from '../Game';
import { bg_h, bg_w } from '../../sprites';

export class Background extends Base {
  public skin = 0;

  constructor(game: Game, config: BackgroundConfig) {
    super(game, {
      ...config,
      collisionBox: { width: bg_w, height: bg_h, ...config.collisionBox },
    });
  }
}

export type BackgroundConfig = BaseConfig;
