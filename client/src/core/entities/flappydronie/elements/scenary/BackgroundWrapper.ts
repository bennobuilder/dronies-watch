import { Background } from './Background';
import { bg_h, bg_w } from '../../sprites';
import { Game } from '../Game';

export class BackgroundWrapper {
  public game: Game;

  public backgrounds: Background[];
  public cx: number;
  public vx: number;

  constructor(game: Game, backgrounds: Background[]) {
    this.game = game;
    this.backgrounds = backgrounds;
    this.cx = 0;
    this.vx = 0.5;
  }

  public update() {
    const newBackgroundPos = (this.cx - this.vx) % (bg_w - 5); // -5 to hide white stripe between the two images

    if (this.backgrounds.length === 2) {
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

  public render() {
    this.backgrounds.forEach((background) => background.render());
  }
}
