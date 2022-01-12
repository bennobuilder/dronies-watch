import { defineConfig } from '@agile-ts/core';
import { Base, BaseConfig } from './Base';
import { Game } from './Game';
import { bird_h, bird_w } from '../sprites';

export class Bird extends Base {
  public skin; // UI skin

  private readonly jumpForce = 4.6;

  private isRotationLocked = false;

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
    this._vy = velocity;
  }

  public calculateRotation() {
    // When bird lacks upward momentum increment the rotation angle
    if (this._vy > 5) {
      this.rotate(Math.min(Math.PI / 2.5, this.rotation + 0.1));
    } else {
      this.rotate(Math.max(-0.3, this.rotation - 0.1));
    }
  }

  public jump() {
    this._vy = -this.jumpForce;
  }

  public update() {
    super.update();
    if (!this.isRotationLocked) this.calculateRotation();
  }

  public lockRotation() {
    this.isRotationLocked = true;
  }

  public unlockRotation() {
    this.isRotationLocked = false;
  }
}

export type BirdConfig = { skin?: number } & BaseConfig;
