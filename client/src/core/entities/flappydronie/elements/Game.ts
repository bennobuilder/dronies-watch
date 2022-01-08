export class Game {
  public frame = 0;
  public canvasDimensions: CanvasDimensions;

  constructor(canvasDimensions: CanvasDimensions) {
    this.canvasDimensions = canvasDimensions;
  }

  public update() {
    this.frame += 1;
  }
}

type CanvasDimensions = {
  width: number;
  height: number;
};
