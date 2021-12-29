import { Base } from './base';

export class Bird extends Base {
  public velocity: number;

  // Static properties, that doesn't change over time
  public gravity = 0.25;
  public jump = 4.6;
  public radius = 20; // Collision radius

  constructor(cx: number, cy: number) {
    super(cx, cy, 0);
    this.velocity = 0;
  }
}
