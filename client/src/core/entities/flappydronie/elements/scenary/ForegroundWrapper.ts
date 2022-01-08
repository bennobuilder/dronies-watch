import { Foreground } from './Foreground';
import { Game } from '../Game';
import { fg_w, fg_h } from '../../sprites';
import { Base, BaseConfig } from '../Base';

export class ForegroundWrapper extends Base {
  public foregrounds: Foreground[];

  constructor(game: Game, config: ForegroundWrapperConfig) {
    super(game, {
      ...config,
      vx: 2,
      collisionBox: {
        width: fg_w * 2,
        height: fg_h,
        ...config.collisionBox,
      },
    });

    this.foregrounds = [
      new Foreground(game, {
        cx: 0,
        cy: game.canvasDimensions.height - fg_h,
        collisionBox: { height: fg_h - 20 },
      }),
      new Foreground(game, {
        cx: fg_w,
        cy: game.canvasDimensions.height - fg_h,
        collisionBox: { height: fg_h - 20 },
      }),
    ];
  }

  public update() {
    const newForegroundPos = (this.cx - this.vx) % (fg_w - 5); // -5 to hide white stripe between the two images

    if (this.foregrounds.length === 2) {
      this.foregrounds[0].move({
        cx: newForegroundPos,
        cy: this.game.canvasDimensions.height - fg_h, // Required when resizing
      });
      this.foregrounds[1].move({
        cx: newForegroundPos + (fg_w - 5), // -5 to hide white stripe between the two images
        cy: this.game.canvasDimensions.height - fg_h, // Required when resizing
      });
    }
  }
}

type ForegroundWrapperConfig = BaseConfig;
