import { Background } from './Background';
import { bg_h, bg_w } from '../../sprites';
import { Game } from '../Game';
import { Base, BaseConfig } from '../Base';

export class BackgroundWrapper extends Base {
  public backgrounds: Background[];

  constructor(game: Game, config: BackgroundWrapperConfig) {
    super(game, {
      ...config,
      vx: 0.5,
      collisionBox: {
        width: bg_w * 2,
        height: bg_h,
        ...config.collisionBox,
      },
    });

    this.backgrounds = [
      new Background(game, { cx: 0, cy: game.canvasDimensions.height - bg_h }),
      new Background(game, {
        cx: bg_w,
        cy: game.canvasDimensions.height - bg_h,
      }),
    ];
  }

  public update() {
    const newBackgroundPos = (this.cx - this.vx) % (bg_w - 5); // -5 to hide white stripe between the two images

    this.backgrounds[0].move({
      cx: newBackgroundPos,
      cy: this.game.canvasDimensions.height - bg_h, // Required when resizing
    });
    this.backgrounds[1].move({
      cx: newBackgroundPos + (bg_w - 5), // -5 to hide white stripe between the two images
      cy: this.game.canvasDimensions.height - bg_h, // Required when resizing
    });
  }
}

type BackgroundWrapperConfig = BaseConfig;
