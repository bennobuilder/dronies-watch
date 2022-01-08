import { Foreground } from './Foreground';
import { fg_h, fg_w } from '../../sprites';
import { Game } from '../Game';

export class ForegroundWrapper {
  public game: Game;

  public foregrounds: Foreground[];
  public cx: number;
  public vx: number;

  constructor(game: Game, foregrounds: Foreground[]) {
    this.game = game;
    this.foregrounds = foregrounds;
    this.cx = 0;
    this.vx = 0.5;
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

  public render() {
    this.foregrounds.forEach((foreground) => foreground.render());
  }
}
