import { defineConfig } from '@agile-ts/core';
import { Base, BaseConfig } from './Base';
import { Game } from './Game';
import { bird_h, bird_w } from '../sprites';

export class Bird extends Base {
  public velocity: number;
  public gravity = 0.25;
  public jumpForce = 4.6;
  public radius = 20; // Collision radius
  public maxVelocity = 7;
  public skin; // Skin (UI)

  constructor(game: Game, config: BirdConfig) {
    super(game, {
      ...config,
      collisionBox: { width: bird_w, height: bird_h, ...config.collisionBox },
    });
    config = defineConfig(config, {
      skin: 0,
    });
    this.skin = config.skin as any;
    this.velocity = 0;
  }

  public hover(hoverHeight: number) {
    this.move({
      cy: hoverHeight + 5 * Math.cos(this.game.frame / 10), // ~199 - ~201
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

export type BirdConfig = { skin?: number } & BaseConfig;
