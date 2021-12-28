import { Base } from './base';

export class Bird extends Base {
  velocity: number;

  // Static properties, that doesn't change over time
  gravity = 0.25;
  jump = 4.6;
  radius = 12; // Collision radius

  constructor(cx: number, cy: number) {
    super(cx, cy, 0);
    this.velocity = 0;
  }
}
