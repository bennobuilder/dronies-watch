import { defineConfig } from '@agile-ts/core';
import { Base, BaseConfig } from './Base';
import { Game } from './Game';
import { bird_h, bird_w } from '../sprites';

export class Bird extends Base {
  public jumpForce = 4.6;
  public radius = 20; // Collision radius
  public skin; // Skin (UI)

  constructor(game: Game, config: BirdConfig) {
    super(game, {
      gravity: 0.25,
      ...config,
      collisionBox: { width: bird_w, height: bird_h, ...config.collisionBox },
    });
    config = defineConfig(config, {
      skin: 0,
    });
    this.skin = config.skin as any;
  }

  public hover(hoverHeight: number) {
    this.move({
      cy: hoverHeight + 5 * Math.cos(this.game.frame / 10), // ~199 - ~201
    });
  }

  public setVelocity(velocity: number) {
    this.vy = velocity;
  }

  public calculateRotation() {
    // When bird lacks upward momentum increment the rotation angle
    if (this.vy > 5) {
      this.rotate(Math.min(Math.PI / 2.5, this.rotation + 0.1));
    } else {
      this.rotate(Math.max(-0.3, this.rotation - 0.1));
    }
  }

  public jump() {
    this.vy = -this.jumpForce;
  }

  public update() {
    super.update();
    this.calculateRotation();
  }
}

export type BirdConfig = { skin?: number } & BaseConfig;
