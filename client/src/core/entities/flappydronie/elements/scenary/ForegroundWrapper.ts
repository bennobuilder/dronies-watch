import { Foreground } from './Foreground';
import { fg_h, fg_w } from '../../sprites';
import { Game } from '../Game';
import { Base, BaseConfig } from '../Base';

export class ForegroundWrapper extends Base {
  public foregrounds: Foreground[];

  constructor(game: Game, config: ForegroundWrapperConfig) {
    super(game, {
      ...config,
      vx: 2, // Move speed
      collisionBox: {
        width: fg_w * 2,
        height: fg_h,
        ...config.collisionBox,
      },
    });

    this.foregrounds = [
      new Foreground(game, { cx: 0, cy: game.canvasDimensions.height - fg_h }),
      new Foreground(game, {
        cx: fg_w,
        cy: game.canvasDimensions.height - fg_h,
      }),
    ];
  }

  public update() {
    const newForegroundPos = (this._cx - this._vx) % (fg_w - 5);
    this.move({ cx: newForegroundPos }, true);

    this.foregrounds[0].move(
      {
        cx: newForegroundPos,
        cy: this.game.canvasDimensions.height - fg_h, // Required when resizing
      },
      true,
    );
    this.foregrounds[1].move(
      {
        cx: newForegroundPos + (fg_w - 5), // -5 to hide white stripe between the two images
        cy: this.game.canvasDimensions.height - fg_h, // Required when resizing
      },
      true,
    );
  }

  public render(lagOffset: number) {
    this.foregrounds.forEach((fg) => {
      fg.render(lagOffset);
    });
  }
}

type ForegroundWrapperConfig = BaseConfig;
