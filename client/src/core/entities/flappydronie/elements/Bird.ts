import { Base, BaseConfig } from './Base';
import { FRAMES } from '../game.controller';

export class Bird extends Base {
  public velocity: number;

  // Static properties, that doesn't change over time
  public gravity = 0.25;
  public jumpForce = 4.6;
  public radius = 20; // Collision radius
  public skin = Math.floor(Math.random() * 20) + 1;
  public maxVelocity = 7;

  constructor(config: BaseConfig) {
    super(config);
    this.velocity = 0;
  }

  public hover(hoverHeight: number) {
    this.move({
      // TODO outsource frame
      cy: hoverHeight + 5 * Math.cos(FRAMES.value / 10), // ~199 - ~201
    });
  }

  public setVelocity(velocity: number) {
    this.velocity = velocity;
  }

  public calculateVelocity() {
    this.velocity += this.gravity;
    if (this.velocity > this.maxVelocity) this.velocity = this.maxVelocity;
    this.move({ cy: this.cy + this.velocity });
  }

  public calculateRotation() {
    // When bird lacks upward momentum increment the rotation angle
    if (this.velocity > 5) {
      this.rotate(Math.min(Math.PI / 2.5, this.rotation + 0.1));
    } else {
      this.rotate(Math.max(-0.3, this.rotation - 0.1));
    }
  }

  public jump() {
    this.velocity = -this.jumpForce;
  }
}
