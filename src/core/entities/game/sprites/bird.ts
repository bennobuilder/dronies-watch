import { Base } from './base';

export class Bird extends Base {
  public velocity: number;

  // Static properties, that doesn't change over time
  public gravity = 0.25;
  public jump = 4.6;
  public radius = 16; // Collision radius
  public skin = Math.floor(Math.random() * 21) + 1;

  constructor(cx: number, cy: number) {
    super(cx, cy, 0);
    this.velocity = 0;
  }
}
