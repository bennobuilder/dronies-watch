import { defineConfig, generateId } from '@agile-ts/core';
import { Game } from './Game';

export class Base {
  public id: string;

  public game: Game;

  public cx: number; // X Position
  public cy: number; // Y Position

  public vx: number; // Velocity X
  public vy: number; // Velocity Y

  public mvx: number; // Max Velocity X
  public mvy: number; // Max Velocity Y

  public rx: number; // Render X
  public ry: number; // Render Y

  public gravity;

  public rotation: number;
  public lockRotation = false;

  public collisionBox: CollisionBoxConfig;

  private updateCallback?: (base: Base) => void;
  private renderCallback?: (base: Base, lagOffset: number) => void;

  constructor(game: Game, config: BaseConfig = {}) {
    config = defineConfig(config, {
      collisionBox: {},
      cx: 0,
      cy: 0,
      vx: 0,
      vy: 0,
      rotation: 0,
      gravity: 0,
    });

    this.id = generateId();
    this.game = game;

    this.collisionBox = {
      width: 10,
      height: 10,
      offset: {
        x: 0,
        y: 0,
        ...(config.collisionBox?.offset || {}),
      },
      ...config.collisionBox,
    };
    this.cx = config.cx!;
    this.cy = config.cy!;
    this.vx = config.vx!;
    this.vy = config.vy!;
    this.mvx = 10;
    this.mvy = 7;
    this.rx = this.cx;
    this.ry = this.cy;
    this.rotation = config.rotation!;
    this.gravity = config.gravity!;

    this.updateCallback = config.updateCallback;
    this.renderCallback = config.renderCallback;
  }

  public move(newPos: MoveConfig) {
    newPos = defineConfig(newPos, {
      cx: this.cx,
      cy: this.cy,
    });

    this.cx = (newPos.cx as any) + this.vx;
    this.cy = (newPos.cy as any) + this.vy;
  }

  public rotate(rotation: number) {
    if (!this.lockRotation) this.rotation = rotation;
  }

  public calculateCollision(object: Base): boolean;
  public calculateCollision(object: CalculateCollisionObject): boolean;
  public calculateCollision(object: CalculateCollisionObject | Base): boolean {
    let finalObject: CalculateCollisionObject;
    if (object instanceof Base) {
      finalObject = {
        cx: object.cx + object.collisionBox.offset.x,
        cy: object.cy + object.collisionBox.offset.y,
        width: object.collisionBox.width,
        height: object.collisionBox.height,
      };
    } else {
      finalObject = object;
    }

    return (
      this.cx < finalObject.cx + finalObject.width &&
      this.cx + this.collisionBox.width > finalObject.cx &&
      this.cy < finalObject.cy + finalObject.height &&
      this.collisionBox.height + this.cy > finalObject.cy
    );
  }

  public update() {
    this.vy += this.gravity;
    if (this.vy > this.mvy) this.vy = this.mvy;
    this.move({ cy: this.cy });
  }

  public render() {
    // TODO
  }
}

export type BaseConfig = {
  cx?: number;
  cy?: number;
  vx?: number;
  vy?: number;
  rotation?: number;
  gravity?: number;

  updateCallback?: (base: Base) => void;
  renderCallback?: (base: Base, lagOffset: number) => void;

  collisionBox?: Partial<CollisionBoxConfig>;
};

type CollisionBoxConfig = {
  width: number;
  height: number;
  offset: { x: number; y: number };
};

type MoveConfig = {
  cx?: number;
  cy?: number;
};

type CalculateCollisionObject = {
  cx: number;
  cy: number;
  width: number;
  height: number;
};
