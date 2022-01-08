export class Game {
  public frame = 0;
  public canvasDimensions: CanvasDimensions = { width: 0, height: 0 };

  public update() {
    this.frame += 1;
  }

  public syncCanvasDimensions(dimensions: CanvasDimensions) {
    this.canvasDimensions = dimensions;
  }
}

type CanvasDimensions = {
  width: number;
  height: number;
};
